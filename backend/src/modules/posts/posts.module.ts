import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './posts.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { Comment } from '../comments/comments.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}


