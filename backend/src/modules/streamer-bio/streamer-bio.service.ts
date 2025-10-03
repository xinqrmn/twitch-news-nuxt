import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { StreamerBio } from './streamer-bio.entity'
import { CreateStreamerBioDto } from './dto/create-streamer-bio.dto'
import { Streamer } from '../streamers/streamer.entity'

@Injectable()
export class StreamerBioService {
  constructor(
    @InjectRepository(StreamerBio)
    private bioRepo: Repository<StreamerBio>,
    @InjectRepository(Streamer)
    private streamerRepo: Repository<Streamer>
  ) {}

  async create(streamerId: number, dto: CreateStreamerBioDto) {
    const streamer = await this.streamerRepo.findOne({ where: { id: streamerId } })
    if (!streamer) throw new NotFoundException('Streamer not found')

    const bio = this.bioRepo.create({ ...dto, streamer: { id: streamerId } })
    return this.bioRepo.save(bio)
  }

  async update(streamerId: number, dto: CreateStreamerBioDto) {
    const bio = await this.bioRepo.findOne({
      where: { streamer: { id: streamerId } },
      relations: ['streamer'],
    })
    if (!bio) throw new NotFoundException('Bio not found')

    Object.assign(bio, dto)
    return this.bioRepo.save(bio)
  }

  async findOne(streamerId: number) {
    return this.bioRepo.findOne({
      where: { streamer: { id: streamerId } },
      relations: ['streamer']
    })
  }

  async findByStreamerId(streamerId: number) {
    return this.bioRepo.findOne({
      where: { streamer: { id: streamerId } },
      relations: ['streamer'],
    });
  }

  async createOrUpdate(streamerId: number, dto: CreateStreamerBioDto) {
    let bio = await this.bioRepo.findOne({ where: { streamer: { id: streamerId } } });

    if (bio) {
      await this.bioRepo.update(bio.id, dto);
      return this.bioRepo.findOne({ where: { id: bio.id }, relations: ['streamer'] });
    } else {
      const newBio = this.bioRepo.create({
        ...dto,
        streamer: { id: streamerId },
      });
      return this.bioRepo.save(newBio);
    }
  }
}
