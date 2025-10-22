import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository, EntityManager } from 'typeorm'
import { StreamerBio } from './streamer-bio.entity'
import { Streamer } from '../streamers/streamer.entity'
import { CreateStreamerBioDto } from './dto/create-streamer-bio.dto'
import { UpdateStreamerBioDto } from './dto/update-streamer-bio.dto'
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

  async create(
    dto: CreateStreamerBioDto,
    manager: EntityManager = this.dataSource.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const existingBio = await m.findOne(StreamerBio, {
        where: [{ displayName: dto.displayName, del: 0 }],
      })

      if (existingBio) {
        throw new HttpException('Био на этого стримера уже существует!', HttpStatus.CONFLICT)
      }

      const bioData: Partial<StreamerBio> = {}

      if (dto.displayName !== undefined) bioData.displayName = dto.displayName
      if (dto.byname !== undefined) bioData.byname = dto.byname
      if (dto.mainGame !== undefined) bioData.mainGame = dto.mainGame
      if (dto.weight !== undefined) bioData.weight = dto.weight
      if (dto.country !== undefined) bioData.country = dto.country
      if (dto.city !== undefined) bioData.city = dto.city
      if (dto.height !== undefined) bioData.height = dto.height
      if (dto.bio !== undefined) bioData.bio = dto.bio
      if (dto.gallery !== undefined) bioData.gallery = dto.gallery
      if (dto.socials !== undefined) bioData.socials = dto.socials

      if (dto.birthday) {
        bioData.birthday = new Date(dto.birthday)
      }

      const bio = m.create(StreamerBio, bioData)

      await m.save(StreamerBio, bio)
    })
  }

  async findOneByDisplayName(dName: string): Promise<StreamerBio | null> {
    return await this.bioRepo.findOne({
      where: { displayName: dName, del: 0 },
      select: [
        'id',
        'displayName',
        'byname',
        'birthday',
        'mainGame',
        'weight',
        'country',
        'city',
        'height',
        'bio',
        'gallery',
        'socials',
        'created_at',
        'updated_at',
      ],
    })
  }

  async getAllBioList(query: PaginateQuery): Promise<Paginated<StreamerBio>> {
    const paginated = await paginate(query, this.bioRepo, {
      select: [
        'id',
        'displayName',
        'byname',
        'birthday',
        'mainGame',
        'weight',
        'country',
        'city',
        'height',
        'bio',
        'gallery',
        'socials',
        'created_at',
        'updated_at',
      ],
      where: { del: 0 },
      sortableColumns: [
        'id',
        'displayName',
        'byname',
        'birthday',
        'mainGame',
        'country',
        'created_at',
        'updated_at',
      ],
      searchableColumns: ['id', 'displayName', 'byname', 'birthday', 'mainGame', 'country'],
      filterableColumns: {
        id: [],
        displayName: [],
        byname: [],
        birthday: [],
        mainGame: [],
        country: [],
      },
      defaultSortBy: [['created_at', 'DESC']],
    })
    return paginated
  }

  async update(
    id: number,
    dto: UpdateStreamerBioDto,
    manager: EntityManager = this.dataSource.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const bio = await m.findOne(StreamerBio, { where: { id, del: 0 } })
      if (!bio) {
        throw new HttpException('Био не найдено', HttpStatus.NOT_FOUND)
      }

      if (dto.displayName || dto.byname) {
        const existingBio = await m.findOne(StreamerBio, {
          where: { displayName: dto.displayName, del: 0 },
        })

        if (existingBio && existingBio.id !== id) {
          throw new HttpException('Био с таким именем уже существует!', HttpStatus.CONFLICT)
        }
      }

      const updateData: Partial<StreamerBio> = {}

      if (dto.displayName !== undefined) updateData.displayName = dto.displayName
      if (dto.byname !== undefined) updateData.byname = dto.byname
      if (dto.mainGame !== undefined) updateData.mainGame = dto.mainGame
      if (dto.weight !== undefined) updateData.weight = dto.weight
      if (dto.country !== undefined) updateData.country = dto.country
      if (dto.city !== undefined) updateData.city = dto.city
      if (dto.height !== undefined) updateData.height = dto.height
      if (dto.bio !== undefined) updateData.bio = dto.bio
      if (dto.gallery !== undefined) updateData.gallery = dto.gallery
      if (dto.socials !== undefined) updateData.socials = dto.socials

      if (dto.birthday) {
        updateData.birthday = new Date(dto.birthday)
      }

      await m.update(StreamerBio, { id }, updateData)
    })
  }

  async softDelete(id: number, manager: EntityManager = this.dataSource.manager): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const bio = await m.findOne(StreamerBio, { where: { id, del: 0 } })
      if (!bio) {
        throw new HttpException('Био не найдено', HttpStatus.NOT_FOUND)
      }

      await m.update(StreamerBio, { id }, { del: 1 })
    })
  }
}
