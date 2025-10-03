import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamerBio } from './streamer-bio.entity';
import { Streamer } from '../streamers/streamer.entity';
import { StreamerBioService } from './streamer-bio.service';
import { StreamerBioController } from './streamer-bio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StreamerBio, Streamer])],
  providers: [StreamerBioService],
  controllers: [StreamerBioController],
})
export class StreamerBioModule {}