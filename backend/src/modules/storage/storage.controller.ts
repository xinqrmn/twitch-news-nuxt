import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { StorageService } from './storage.service'
import { FileInterceptor } from '@nestjs/platform-express'
import multer from 'multer'
import { Respond } from 'src/common/response/response'
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { StorageDeleteDto } from './dto/storage-delete.dto'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Roles } from 'src/common/decorators/roles.decorator'
import { JWTGuard } from '../auth/guards/jwt.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

const ALLOWED_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'mp3']

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('save')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JWTGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Roles(['admin', 'news_author', 'news_editor', 'streamer_bio_author', 'streamer_bio_editor'])
  @ApiOperation({
    summary: 'Загрузка в файла хранилище',
    description:
      'Загрузка файла в хранилище. Требуется токен авторизации и роль `Администратор`, `Редактор новостей`, `Автор новостей`, `Редактор карточек стримера`, или `Автор карточек стримера`',
  })
  @ApiResponse({ status: 201, description: 'Файл успешно загружен' })
  @ApiResponse({
    status: 500,
    description: 'Ошибка S3 хранилища',
  })
  @ApiResponse({
    status: 415,
    description: 'Файл имеет запрещенное расширение',
  })
  @ApiResponse({
    status: 406,
    description: 'Файл не прикреплен',
  })
  @ApiResponse({
    status: 413,
    description: 'Файл слишком большой',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async fileSave(
    @Req() req: Request & { user?: { username: string } },
    @UploadedFile() file: Express.Multer.File
  ): Promise<Respond<{ url: string }>> {
    if (!file) throw new HttpException('Файл не прикреплен!', HttpStatus.NOT_ACCEPTABLE)

    if (file.size > 5e6)
      throw new HttpException('Файл слишком большой', HttpStatus.PAYLOAD_TOO_LARGE)

    const [, fileExtension] = file.mimetype.split('/')
    if (!fileExtension || !ALLOWED_FILE_EXTENSIONS.includes(fileExtension))
      throw new HttpException(
        'Файл имеет запрещенное расширение',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE
      )

    const url = await this.storageService.uploadFile(file)
    return Respond.one({ url })
  }

  @Post('delete')
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(['admin', 'news_editor', 'streamer_bio_editor'])
  @ApiOperation({
    summary: 'Удаление файла из хранилища',
    description:
      'Удаление файла из хранилища. Требуется токен авторизации и роль `Администратор`, `Редактор новостей`, `Редактор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Файл успешно удален' })
  @ApiResponse({
    status: 500,
    description: 'Ошибка S3 хранилища',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async fileDelete(@Body() fileDeleteDto: StorageDeleteDto) {
    await this.storageService.deleteFile(fileDeleteDto)
    return Respond.ok()
  }

  @Get('/get')
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(['admin', 'news_editor', 'streamer_bio_editor'])
  @ApiOperation({
    summary: 'Получение списка всех файлов (с пагинацией)',
    description:
      'Получение списка всех файлов. Требуется токен авторизации и роль `Администратор`, `Редактор новостей`, `Редактор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async getStorageFiles(@Paginate() query: PaginateQuery) {
    const { data, meta } = await this.storageService.getStorageFiles(query)
    return Respond.many(data, meta)
  }
}
