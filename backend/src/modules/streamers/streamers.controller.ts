import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common'
import { StreamersService } from './streamers.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Respond } from 'src/common/response/response'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Streamers')
@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

  @Get('/get')
  @ApiOperation({ summary: 'Получить всех стримеров' })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получить всех стримеров',
    description: 'Получение списка всех стримеров с пагинацией. Авторизация не требуется.',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  async getAllStreamers(@Paginate() query: PaginateQuery) {
    const { data, meta } = await this.streamersService.getAllStreamers(query)

    return Respond.many(data, meta)
  }

  @Get(':displayName')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Получить стримера по displayName' })
  @ApiResponse({ status: 200, description: 'Стример получен' })
  @ApiResponse({ status: 404, description: 'Стример не найден' })
  async findOne(@Param('displayName') dName: string) {
    return Respond.one(await this.streamersService.getOneByDisplayName(dName))
  }

  @Get('/get/list')
  @ApiOperation({ summary: 'Получить displayName всех стримеров' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(StreamersController.JwtAuthGuard)
  @ApiOperation({
    summary: 'Получить всех стримеров',
    description:
      'Получение списка displayName всех стримеров с признаком has_bio. Требуется роль `Администратор`, `Редактор карточек стримера` или `Автор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 500, description: 'Недостаточно прав' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  async getAllStreamersList(@Req() req: Request & { user?: { roles?: string[] } }) {
    const roles: string[] = req.user?.roles ?? []
    if (
      !(
        roles.includes('admin') ||
        roles.includes('streamer_bio_editor') ||
        roles.includes('streamer_bio_author')
      )
    ) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const data = await this.streamersService.getAllStreamersList()

    return Respond.one(data)
  }
}
