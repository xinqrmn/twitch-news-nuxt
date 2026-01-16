import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParserService } from './parser.service'
import { ParserController } from './parser.controller'
import { ParserExecutions } from './parser.entity'
import { Streamer } from '../streamers/streamer.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ParserExecutions, Streamer]), AuthModule],
  exports: [ParserService],
  providers: [ParserService],
  controllers: [ParserController],
})
export class ParserModule {}
