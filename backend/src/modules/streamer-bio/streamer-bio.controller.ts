import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { StreamerBioService } from './streamer-bio.service';
import { CreateStreamerBioDto } from './dto/create-streamer-bio.dto';
import { UpdateStreamerBioDto } from './dto/update-streamer-bio.dto';

@Controller('streamer-bio')
export class StreamerBioController {
  constructor(private readonly bioService: StreamerBioService) {}

  @Get(':id')
  findOne(@Param('id') streamerId: number) {
    return this.bioService.findByStreamerId(streamerId);
  }

  @Post(':id')
  create(@Param('id') streamerId: number, @Body() dto: CreateStreamerBioDto) {
    return this.bioService.createOrUpdate(streamerId, dto);
  }

  @Put(':id')
  update(@Param('id') streamerId: number, @Body() dto: UpdateStreamerBioDto) {
    return this.bioService.createOrUpdate(streamerId, dto);
  }
}
