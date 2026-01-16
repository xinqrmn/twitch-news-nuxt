import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Streamer } from './streamer.entity'
import { StreamersService } from './streamers.service'
import { StreamersController } from './streamers.controller'
import { StreamerBio } from '../streamer-bio/streamer-bio.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Streamer, StreamerBio]), AuthModule],
  controllers: [StreamersController],
  providers: [StreamersService],
  exports: [StreamersService],
})
export class StreamersModule {}
