import { Controller, Get, HttpCode, HttpStatus, UseGuards, Param } from '@nestjs/common'
import { StreamersService } from './streamers.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Respond } from 'src/common/response/response'
import { Roles } from 'src/common/decorators/roles.decorator'
import { JWTGuard } from '../auth/guards/jwt.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@ApiTags('Streamers')
@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

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
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(['admin', 'streamer_bio_editor', 'streamer_bio_author'])
  @ApiOperation({
    summary: 'Получить всех стримеров',
    description:
      'Получение списка displayName всех стримеров с признаком has_bio. Требуется роль `Администратор`, `Редактор карточек стримера` или `Автор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  async getAllStreamersList() {
    const data = await this.streamersService.getAllStreamersList()
    return Respond.one(data)
  }
}
