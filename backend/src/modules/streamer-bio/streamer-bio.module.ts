import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StreamerBioService } from './streamer-bio.service'
import { StreamerBioController } from './streamer-bio.controller'
import { StreamerBio } from './streamer-bio.entity'
import { Streamer } from '../streamers/streamer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([StreamerBio, Streamer])],
  controllers: [StreamerBioController],
  providers: [StreamerBioService],
  exports: [StreamerBioService],
})
export class StreamerBioModule {}
