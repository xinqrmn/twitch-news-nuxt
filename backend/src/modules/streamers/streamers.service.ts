import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Streamer } from './streamer.entity'
import { CreateStreamerDto } from './dto/create-streamer.dto'
import { UpdateStreamerDto } from './dto/update-streamer.dto'
import { StreamerBio } from '../streamer-bio/streamer-bio.entity'

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer)
    private readonly streamersRepo: Repository<Streamer>,
    @InjectRepository(StreamerBio)
    private readonly biosRepo: Repository<StreamerBio>,
    private readonly dataSource: DataSource
  ) {}

  async create(dto: CreateStreamerDto): Promise<Streamer> {
    return this.dataSource.transaction(async (manager) => {
      const streamer = manager.create(Streamer, dto)
      return await manager.save(streamer)
    })
  }

  async findAll(): Promise<Streamer[]> {
    return this.streamersRepo.find({ relations: ['bio'] })
  }

  async findOne(id: number): Promise<Streamer> {
    const streamer = await this.streamersRepo.findOne({
      where: { id },
      relations: ['bio'],
    })
    if (!streamer) throw new NotFoundException('Streamer not found')
    return streamer
  }

  async update(id: number, dto: UpdateStreamerDto): Promise<Streamer> {
    return this.dataSource.transaction(async (manager) => {
      const streamer = await manager.findOne(Streamer, { where: { id } })
      if (!streamer) throw new NotFoundException('Streamer not found')
      manager.merge(Streamer, streamer, dto)
      return await manager.save(streamer)
    })
  }

  async remove(id: number): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const streamer = await manager.findOne(Streamer, { where: { id } })
      if (!streamer) throw new NotFoundException('Streamer not found')
      await manager.remove(streamer)
    })
  }

  async seed() {
    return this.dataSource.transaction(async (manager) => {
      await manager.delete(StreamerBio, {})
      await manager.delete(Streamer, {})

      const streamersData = [
        {
          username: 'xinqrmn',
          displayName: 'Roman Galanov',
          avatarUrl: 'https://cdn.example.com/roman.jpg',
          status: 'online',
          languages: ['Russian', 'English'],
          bio: {
            description: 'Vue / Grafana developer, tech content creator',
            followers: 1280,
            twitchLink: 'https://twitch.tv/xinqrmn',
            youtubeLink: 'https://youtube.com/@xinqrmn',
          },
        },
        {
          username: 'pewpew',
          displayName: 'Pew Pew',
          avatarUrl: 'https://cdn.example.com/pewpew.png',
          status: 'offline',
          languages: ['English'],
          bio: {
            description: 'FPS streamer and content creator',
            followers: 956000,
            twitchLink: 'https://twitch.tv/pewpew',
          },
        },
        {
          username: 'katerina_live',
          displayName: 'Katerina Live',
          avatarUrl: 'https://cdn.example.com/katerina.png',
          status: 'online',
          languages: ['Russian'],
          bio: {
            description: 'Just chatting and IRL streams',
            followers: 48200,
            twitchLink: 'https://twitch.tv/katerina_live',
            youtubeLink: 'https://youtube.com/@katerina_live',
          },
        },
      ]

      // 👇 добавляем типизацию
      const created: (Streamer & { bio: StreamerBio })[] = []

      for (const data of streamersData) {
        const streamer = manager.create(Streamer, {
          username: data.username,
          displayName: data.displayName,
          avatarUrl: data.avatarUrl,
          status: data.status,
          languages: data.languages,
        })
        await manager.save(streamer)

        const bio = manager.create(StreamerBio, {
          ...data.bio,
          streamer,
        })
        await manager.save(bio)

        created.push({ ...streamer, bio })
      }

      return created
    })
  }
}
