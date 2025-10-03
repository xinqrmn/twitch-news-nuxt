import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Streamer } from './streamer.entity';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { UpdateStreamerDto } from './dto/update-streamer.dto';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer)
    private streamerRepo: Repository<Streamer>,
  ) {}

  create(dto: CreateStreamerDto) {
    const streamer = this.streamerRepo.create(dto);
    return this.streamerRepo.save(streamer);
  }

  findAll() {
    return this.streamerRepo.find({ relations: ['bio'] });
  }

  async findOne(id: number) {
    const streamer = await this.streamerRepo.findOne({
      where: { id },
      relations: ['bio'],
    });
    if (!streamer) throw new NotFoundException('Streamer not found');
    return streamer;
  }

  async update(id: number, dto: UpdateStreamerDto) {
    const streamer = await this.findOne(id);
    Object.assign(streamer, dto);
    return this.streamerRepo.save(streamer);
  }

  async remove(id: number) {
    const streamer = await this.findOne(id);
    return this.streamerRepo.remove(streamer);
  }
}
