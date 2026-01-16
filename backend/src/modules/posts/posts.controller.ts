import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostCreateDto } from './dto/post-create.dto'
import { PostUpdateDto } from './dto/post-update.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Respond } from 'src/common/response/response'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { Roles } from 'src/common/decorators/roles.decorator'
import { JWTGuard } from '../auth/guards/jwt.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseGuards(JWTGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'news_editor', 'news_author'])
  @ApiOperation({
    summary: 'Создание нового поста',
    description:
      'Создание нового поста. Требуется токен авторизации и роль `Администратор`, `Редактор новостей`, или `Автор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Пост успешно создан' })
  @ApiResponse({
    status: 409,
    description: 'Пост с таким slug уже существует',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async create(@Body() dto: PostCreateDto, @Req() req: Request & { user?: { username: string } }) {
    await this.postsService.create(dto, req.user?.username ?? '')
    return Respond.ok()
  }

  @Get('get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение всех выложенных постов',
    description: 'Получение всех постов. Токен авторизации не требуется',
  })
  @ApiResponse({ status: 200, description: 'Посты получены' })
  @ApiResponse({
    status: 500,
    description: 'Увы(',
  })
  async getAllPosts(@Paginate() query: PaginateQuery) {
    const { data, meta } = await this.postsService.getAllPosts(query)
    return Respond.many(data, meta)
  }

  @Get('get/all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(['admin', 'news_editor', 'news_author'])
  @ApiOperation({
    summary: 'Получение всех постов (с невыложенными)',
    description:
      'Получение всех постов (с невыложенными). Требуется токен авторизации и роль `Администратор`, `Редактор новостей`, или `Автор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Посты получены' })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async getAllPostsWithUnpublished(@Paginate() query: PaginateQuery) {
    const { data, meta } = await this.postsService.getAllPostsWithUnpublished(query)
    return Respond.many(data, meta)
  }

  @Get('get/:id')
  @ApiOperation({
    summary: 'Получение поста по айди',
    description: 'Получение поста по айди. Токен авторизации не требуется',
  })
  @ApiResponse({ status: 200, description: 'Пост получены' })
  @ApiResponse({
    status: 500,
    description: 'Увы(',
  })
  async findOneById(@Param('id') id: string) {
    const post = await this.postsService.findOneById(Number(id))
    return Respond.one(post)
  }

  @Get('view/:id')
  @ApiOperation({
    summary: 'Добавление просмотра на пост',
    description: 'Добавление просмотра на пост по айди. Токен авторизации не требуется',
  })
  @ApiResponse({ status: 200, description: 'Просмотр добавлен' })
  @ApiResponse({
    status: 500,
    description: 'Непредвиденная ошибка',
  })
  async addView(@Param('id') id: string) {
    await this.postsService.addView(Number(id))
    return Respond.ok()
  }

  @Get('get/by-slug/:slug')
  @ApiOperation({
    summary: 'Получение поста по слагу',
    description: 'Получение поста по слагу. Токен авторизации не требуется',
  })
  @ApiResponse({ status: 200, description: 'Пост получены' })
  @ApiResponse({
    status: 500,
    description: 'Увы(',
  })
  async findOneBySlug(@Param('slug') slug: string) {
    const post = await this.postsService.findOneBySlug(slug)
    return Respond.one(post)
  }

  @Get('top')
  @ApiOperation({
    summary: 'Получение топ 5 постов',
    description:
      'Получение топ 5 постов за неделю, отсортированных по просмотрам. Токен авторизации не требуется',
  })
  @ApiResponse({ status: 200, description: 'Посты получены' })
  @ApiResponse({
    status: 500,
    description: 'Непредвиденная ошибка',
  })
  async getTopPosts() {
    const posts = await this.postsService.getTopPosts()
    return Respond.one(posts)
  }

  @Patch('update/:id')
  @UseGuards(JWTGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'news_editor'])
  @ApiOperation({
    summary: 'Редактирование поста по id',
    description:
      'Редактирование поста по id. Требуется токен авторизации и роль `Администратор` или `Редактор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Пост успешно отредактирован' })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async update(@Param('id') id: string, @Body() dto: PostUpdateDto) {
    await this.postsService.update(Number(id), dto)
    return Respond.ok()
  }

  @Delete('delete/:id')
  @UseGuards(JWTGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'news_editor'])
  @ApiOperation({
    summary: 'Жесткое удаление поста по id',
    description:
      'Жесткое каскадное удаление поста по id. Требуется токен авторизации и роль `Администратор` или `Редактор новостей`',
  })
  @ApiResponse({ status: 200, description: 'Пост успешно удален' })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав',
  })
  async deleteById(@Param('id') id: string) {
    await this.postsService.deleteById(Number(id))
    return Respond.ok()
  }
}
