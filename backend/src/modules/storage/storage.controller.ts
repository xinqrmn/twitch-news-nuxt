import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
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
import { AuthGuard } from '@nestjs/passport'
import { StorageDeleteDto } from './dto/storage-delete.dto'

const ALLOWED_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'mp3']

// @UseGuards(AuthGuard)
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

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
  @UseGuards(StorageController.JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
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
    status: 400,
    description: 'Файл имеет запрещенное расширение',
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
    @Req() req: Request & { user?: { username: string; roles?: string[] } },
    @UploadedFile() file: Express.Multer.File
  ): Promise<Respond<{ url: string }>> {
    const roles: string[] = req.user?.roles ?? []
    if (
      !roles.some((r) => {
          return [
            'admin', 'news_author', 'news_editor', 'streamer_bio_author', 'streamer_bio_editor'
          ].includes(r)
      })
    ) {
      throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN)
    }
    if (file.size > 5e6)
      throw new HttpException('Файл слишком большой', HttpStatus.PAYLOAD_TOO_LARGE)

    const [, fileExtension] = file.mimetype.split('/')
    if (!fileExtension || !ALLOWED_FILE_EXTENSIONS.includes(fileExtension))
      throw new HttpException('Файл имеет запрещенное расширение', HttpStatus.BAD_REQUEST)

    const url = await this.storageService.uploadFile(file)
    return Respond.one({ url })
  }

  @Post('delete')
  @UseGuards(StorageController.JwtAuthGuard)
  @ApiOperation({
    summary: 'Удаление файла из хранилища',
    description:
      'Создание нового поста. Требуется токен авторизации и роль `Администратор`, `Редактор новостей`, `Редактор карточек стримера`',
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
  async fileDelete(
    @Req() req: Request & { user?: { username: string; roles?: string[] } },
    @Body() fileDeleteDto: StorageDeleteDto
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (
      !roles.some((r) => {
          return [
            'admin', 'news_editor', 'streamer_bio_editor'
          ].includes(r)
      })
    ) {
      throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN)
    }

    await this.storageService.deleteFile(fileDeleteDto)
    return Respond.ok()
  }
}
