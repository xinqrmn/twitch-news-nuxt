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
  HttpException,
  UseGuards,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostCreateDto } from './dto/post-create.dto'
import { PostUpdateDto } from './dto/post-update.dto'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Respond } from 'src/common/response/response'
import { Paginate, PaginateQuery } from 'nestjs-paginate'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

  @Post('create')
  @UseGuards(PostsController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
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
  async create(
    @Body() dto: PostCreateDto,
    @Req() req: Request & { user?: { username: string; roles?: string[] } }
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (
      !(roles.includes('admin') || roles.includes('news_editor') || roles.includes('news_author'))
    ) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.postsService.create(dto, req.user?.username ?? '')
    return Respond.ok()
  }

  @Get('get')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение всех постов',
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

  @Patch('update/:id')
  @UseGuards(PostsController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
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
    status: 500,
    description: 'Недостаточно прав',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: PostUpdateDto,
    @Req() req: Request & { user?: { username: string; roles?: string[] } }
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (!(roles.includes('admin') || roles.includes('news_editor'))) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.postsService.update(Number(id), dto)
    return Respond.ok()
  }

  @Delete('delete/:id')
  @UseGuards(PostsController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
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
    status: 500,
    description: 'Недостаточно прав',
  })
  async deleteById(
    @Param('id') id: string,
    @Req() req: Request & { user?: { username: string; roles?: string[] } }
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (!(roles.includes('admin') || roles.includes('news_editor'))) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.postsService.deleteById(Number(id))
    return Respond.ok()
  }
}
