import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { Comment } from './comments.entity'
import { CommentCreateDto } from './dto/comment-create.dto'
import { Respond } from 'src/common/response/response'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CommentCreateDto){
    await this.commentsService.create(dto)
    return Respond.ok()
  }

  @Get('by-post/:postId')
  async byPost(@Param('postId') postId: string){
    return await this.commentsService.getByPost(Number(postId))
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string){
    await this.commentsService.deleteById(Number(id))
    return Respond.ok()
  }
}


