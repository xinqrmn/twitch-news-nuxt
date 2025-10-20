import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParserService } from './parser.service'
import { ParserController } from './parser.controller'
import { ParserData } from './parser.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ParserData])],
  exports: [ParserService],
  providers: [ParserService],
  controllers: [ParserController],
})
export class ParserModule {}
