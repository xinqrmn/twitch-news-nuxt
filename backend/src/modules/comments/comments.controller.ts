import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { Comment } from './comments.entity'
import { CommentCreateDto } from './dto/comment-create.dto'
import { Respond } from 'src/common/response/response'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

  @Post('create')
  @UseGuards(CommentsController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Создание нового комментария',
    description: 'Создание нового комментария. Требуется токен авторизации',
  })
  @ApiResponse({ status: 200, description: 'Комментарий успешно создан' })
  async create(@Body() dto: CommentCreateDto) {
    await this.commentsService.create(dto)
    return Respond.ok()
  }

  @Get('by-post/:postId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение всех комментариев по id поста',
    description:
      'Получение всех комментариев по id поста. Токен авторизации не требуется. Если комментариев нет, то будет возвращен пустой массив',
  })
  @ApiResponse({ status: 200, description: 'Комментарии получены' })
  async byPost(@Param('postId') postId: string) {
    const comments = await this.commentsService.getByPost(Number(postId))
    return Respond.one(comments)
  }

  @Delete('delete/:id')
  @UseGuards(CommentsController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Удаление комментария',
    description:
      'Удаление комментария. Если у комментария есть ответы, они также будут удалены. Требуется токен авторизации и роль `Администратор` или `Редактор новостей`, также автор комментария может удалить свой комментарий',
  })
  @ApiResponse({ status: 200, description: 'Комментарий успешно удален' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Комментарий не найден' })
  async deleteById(
    @Param('id') post_id: string,
    @Req() req: Request & { user: { id: number; roles?: string[] } }
  ) {
    await this.commentsService.deleteById(Number(post_id), {
      id: req.user.id,
      roles: req.user?.roles ?? [],
    })
    return Respond.ok()
  }
}
