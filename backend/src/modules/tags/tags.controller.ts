import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TagsService } from './tags.service'
import { AuthGuard } from '@nestjs/passport'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Respond } from 'src/common/response/response'
import { TagCreateDto } from './dto/tag-create.dto'

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

  @Get('get')
  @UseGuards(TagsController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение списка всех тегов',
    description:
      'Требуется токен авторизации. Только пользователи с ролью `Администратор`, `Редактор новостей` или `Автор новостей` могут получать список всех тегов',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 401, description: 'Пользователь, осуществивший запрос, не авторизован' })
  @ApiResponse({ status: 500, description: 'Недостаточно прав' })
  async getAllTags(@Req() req: Request & { user?: { roles?: string[] } }) {
    const roles: string[] = req.user?.roles ?? []
    if (
      !(roles.includes('admin') || roles.includes('news_editor') || roles.includes('news_author'))
    ) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const tags = await this.tagsService.getAllTags()
    return Respond.one(tags)
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @UseGuards(TagsController.JwtAuthGuard)
  @ApiOperation({
    summary: 'Создание нового тега',
    description:
      'Создание нового тега для новости. Требуется токен авторизации и роль `Администратор` или `Редактор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Тег успешно создан' })
  @ApiResponse({
    status: 409,
    description: 'Такой тег уже существует',
  })
  @ApiResponse({
    status: 500,
    description: 'Недостаточно прав',
  })
  async create(
    @Body() tagCreateDto: TagCreateDto,
    @Req() req: Request & { user?: { roles?: string[] } }
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (!(roles.includes('admin') || roles.includes('news_editor'))) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.tagsService.createTag(tagCreateDto)
    return Respond.ok()
  }

  @Delete('delete/:id')
  @UseGuards(TagsController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Мягкое удаление тега (del=1)',
    description:
      'Требуется токен авторизации. Удалить тег может только пользователь с ролью `Администратор` или `Редактор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Тег помечен как удаленный' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Тег не найден' })
  async deleteUser(
    @Param('id') id: number,
    @Req() req: Request & { user: { roles: string[]; id: number } }
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (!(roles.includes('admin') || roles.includes('news_editor'))) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    await this.tagsService.softDeleteTag(id)

    return Respond.ok()
  }

  @Patch('update/:id')
  @UseGuards(TagsController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Изменение тега',
    description:
      'Требуется токен авторизации. Изменить тег может только пользователь с ролью `Администратор` или `Редактор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Тег обновлен' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Тег не найден' })
  async editUserById(
    @Param('id') id: number,
    @Body() tagUpdateDto: TagCreateDto,
    @Req() req: Request & { user: { roles: string[]; id: number } }
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (!(roles.includes('admin') || roles.includes('news_editor'))) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    await this.tagsService.editTagById(tagUpdateDto, id)

    return Respond.ok()
  }
}
