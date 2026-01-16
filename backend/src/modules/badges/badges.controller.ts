import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BadgesService } from './badges.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Respond } from 'src/common/response/response'
import { BadgeCreateDto } from './dto/badge-create.dto'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Roles } from 'src/common/decorators/roles.decorator'
import { JWTGuard } from '../auth/guards/jwt.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@ApiTags('Badges')
@UseGuards(JWTGuard, RolesGuard)
@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Get('get')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'news_editor', 'news_author'])
  @ApiOperation({
    summary: 'Получение списка всех бейджей (с пагинацией)',
    description:
      'Требуется токен авторизации. Только пользователи с ролью `Администратор`, `Редактор новостей` или `Автор новостей` могут получать список всех бейджей',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 401, description: 'Пользователь, осуществивший запрос, не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async getAllBadges(@Paginate() query: PaginateQuery) {
    const { data, meta } = await this.badgesService.getAllBadges(query)
    return Respond.many(data, meta)
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'news_editor'])
  @ApiOperation({
    summary: 'Создание нового бейджа',
    description:
      'Создание нового бейджа для новости. Требуется токен авторизации и роль `Администратор` или `Редактор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Бейдж успешно создан' })
  @ApiResponse({
    status: 409,
    description: 'Такой бейдж уже существует',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async create(@Body() badgeCreateDto: BadgeCreateDto) {
    await this.badgesService.createBadge(badgeCreateDto)
    return Respond.ok()
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'news_editor'])
  @ApiOperation({
    summary: 'Мягкое удаление бейджа (del=1)',
    description:
      'Требуется токен авторизации. Удалить бейдж может только пользователь с ролью `Администратор` или `Редактор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Бейдж помечен как удаленный' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Бейдж не найден' })
  async deleteBadge(@Param('id') id: number) {
    await this.badgesService.softDeleteBadge(id)
    return Respond.ok()
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'news_editor'])
  @ApiOperation({
    summary: 'Изменение бейджа',
    description:
      'Требуется токен авторизации. Изменить бейдж может только пользователь с ролью `Администратор` или `Редактор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Бейдж обновлен' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Бейдж не найден' })
  async editBadgeById(@Param('id') id: number, @Body() badgeUpdateDto: BadgeCreateDto) {
    await this.badgesService.editBadgeById(badgeUpdateDto, id)
    return Respond.ok()
  }
}


