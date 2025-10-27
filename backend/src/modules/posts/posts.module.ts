import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './posts.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { Comment } from '../comments/comments.entity'
import { PostsScheduler } from './posts.scheduler'

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment]), ScheduleModule],
  providers: [PostsService, PostsScheduler],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}


