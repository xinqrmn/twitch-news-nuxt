import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from './tags.entity'
import { TagsService } from './tags.service'
import { TagsController } from './tags.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
  exports: [TagsService],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
