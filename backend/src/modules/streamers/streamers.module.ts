import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Streamer } from './streamer.entity'
import { StreamersService } from './streamers.service'
import { StreamersController } from './streamers.controller'
import { StreamerBio } from '../streamer-bio/streamer-bio.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Streamer, StreamerBio])],
  controllers: [StreamersController],
  providers: [StreamersService],
  exports: [StreamersService],
})
export class StreamersModule {}
