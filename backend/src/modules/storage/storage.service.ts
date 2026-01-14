import { ConfigService } from '@nestjs/config'
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { Storage } from './storage.entity'
import { StorageDeleteDto } from './dto/storage-delete.dto'
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate'
import { transliterateCyrillic } from 'src/common/utils/transliterateCyrillic'

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
    private readonly configService: ConfigService,
    @InjectRepository(Storage) private readonly storageRepo: Repository<Storage>
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

  private getFileAccessUrl(key: string): string {
    return [this.configService.get('S3_FILE_ACCESS_DOMAIN'), key].join('/')
  }

  private clearFileName(name: string): string {
    console.log(name)
    return transliterateCyrillic(Buffer.from(name, 'ascii').toString('utf-8')).replace(
      /[^a-zA-Z0-9-_.]/g,
      ''
    )
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    file.originalname = this.clearFileName(file.originalname)
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
      throw new HttpException('Не удалось загрузить файл', HttpStatus.INTERNAL_SERVER_ERROR)
    try {
      const res = await this.connection.manager.transaction(async (m: EntityManager) => {
        const createdFile = m.create(Storage, {
          uuid: key,
          name: file.originalname,
          url: this.getFileAccessUrl(key),
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

  async getStorageFiles(query: PaginateQuery): Promise<Paginated<Storage>> {
    const paginated = await paginate(query, this.storageRepo, {
      select: ['name', 'url', 'created_at'],
      sortableColumns: ['name', 'created_at'],
      searchableColumns: ['name', 'created_at'],
      filterableColumns: {
        name: [],
        created_at: [],
      },
      defaultSortBy: [['created_at', 'DESC']],
    })

    return paginated
  }
}
