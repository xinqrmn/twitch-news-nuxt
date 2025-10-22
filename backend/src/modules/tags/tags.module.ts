import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from './tags.entity'
import { TagsService } from './tags.service'
import { TagsController } from './tags.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  exports: [TagsService],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
