import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParserService } from './parser.service'
import { ParserController } from './parser.controller'
import { ParserExecutions } from './parser.entity'
import { Streamer } from '../streamers/streamer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ParserExecutions, Streamer])],
  exports: [ParserService],
  providers: [ParserService],
  controllers: [ParserController],
})
export class ParserModule {}
