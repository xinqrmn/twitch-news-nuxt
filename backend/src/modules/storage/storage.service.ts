import { ConfigService } from '@nestjs/config'
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { DataSource, EntityManager } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { Storage } from './storage.entity'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { StorageDeleteDto } from './dto/storage-delete.dto'

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
    private readonly configService: ConfigService
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('S3_REGION_NAME'),
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY')!,
      },
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
    })
  }

  async getFileEncodedUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: key,
    })
    const url = await getSignedUrl(this.s3Client, command)
    return url
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${uuid()}-${file.originalname}`
    const command = new PutObjectCommand({
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: key,
      Body: file.buffer,
      Metadata: {
        originalName: file.originalname,
      },
    })
    const undoCommand = new DeleteObjectCommand({
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: key,
    })
    const uploadResult = await this.s3Client.send(command)
    if (uploadResult['$metadata'].httpStatusCode !== 200)
      throw new InternalServerErrorException('Не удалось загрузить файл')
    try {
      const res = await this.connection.manager.transaction(async (m: EntityManager) => {
        const createdFile = m.create(Storage, {
          uuid: key,
          name: file.originalname,
          url: await this.getFileEncodedUrl(key),
        })

        await m.save(Storage, createdFile)
        return createdFile.url
      })
      return res
    } catch (err) {
      await this.s3Client.send(undoCommand)
      throw err
    }
  }

  async deleteFile(dto: StorageDeleteDto): Promise<void> {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: dto.key,
    })
    const deleteResult = await this.s3Client.send(deleteCommand)
    if (deleteResult['$metadata'].httpStatusCode !== 204)
      throw new HttpException('Не удалось удалить файл', HttpStatus.INTERNAL_SERVER_ERROR)

    return this.connection.manager.transaction(async (m: EntityManager) => {
      await m.delete(Storage, { uuid: dto.key })
    })
  }
}
