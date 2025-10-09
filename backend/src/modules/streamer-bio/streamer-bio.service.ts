import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { StreamerBio } from './streamer-bio.entity'
import { Streamer } from '../streamers/streamer.entity'
import { CreateStreamerBioDto } from './dto/create-streamer-bio.dto'
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate'

@Injectable()
export class StreamerBioService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(StreamerBio)
    private readonly bioRepo: Repository<StreamerBio>,
    @InjectRepository(Streamer)
    private readonly streamerRepo: Repository<Streamer>
  ) {}

  async findByStreamerId(streamerId: number) {
    return this.bioRepo.findOne({
      where: { streamer: { id: streamerId } },
      relations: ['streamer'],
    })
  }

  async create(streamerId: number, dto: CreateStreamerBioDto) {
    return this.dataSource.transaction(async (manager) => {
      const streamer = await manager.findOne(Streamer, { where: { id: streamerId } })
      if (!streamer) throw new Error('Streamer not found')

      const newBio = manager.create(StreamerBio, {
        ...dto,
        streamer,
      })

      return manager.save(newBio)
    })
  }

  async update(streamerId: number, dto: CreateStreamerBioDto) {
    return this.dataSource.transaction(async (manager) => {
      const bio = await manager.findOne(StreamerBio, {
        where: { streamer: { id: streamerId } },
        relations: ['streamer'],
      })
      if (!bio) throw new Error('Bio not found')

      manager.merge(StreamerBio, bio, dto)
      return manager.save(bio)
    })
  }

  async getAllBioList(query: PaginateQuery): Promise<Paginated<StreamerBio>> {
    const paginated = await paginate(query, this.bioRepo, {
      relations: ['streamer'],
      select: [
        'id',
        'birthday',
        'mainGame',
        'weight',
        'country',
        'city',
        'height',
        'bio',
        'gallery',
        'socials',
      ],
      sortableColumns: ['id', 'birthday', 'mainGame', 'country'],
      searchableColumns: ['id', 'birthday', 'mainGame', 'country'],
      filterableColumns: {
        id: [],
        birthday: [],
      },
    })
    return paginated
  }

  async delete(id: number) {
    return this.bioRepo.delete(id)
  }
}
