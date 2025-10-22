import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, In, Repository } from 'typeorm'
import { Streamer } from './streamer.entity'
import { StreamerBio } from '../streamer-bio/streamer-bio.entity'
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate'

@Injectable()
export class StreamersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Streamer) private readonly streamersRepo: Repository<Streamer>,
    @InjectRepository(StreamerBio) private readonly biosRepo: Repository<StreamerBio>
  ) {}

  async getAllStreamers(query: PaginateQuery): Promise<Paginated<Streamer & { has_bio: boolean }>> {
    const paginated = await paginate(query, this.streamersRepo, {
      select: [
        'id',
        'displayName',
        'allTimePeakViewers',
        'avgViewers',
        'logo',
        'followersGained',
        'totalFollowers',
        'totalViews',
        'hoursWatched',
        'timeStreamed',
      ],
      sortableColumns: [
        'displayName',
        'allTimePeakViewers',
        'avgViewers',
        'followersGained',
        'totalFollowers',
        'totalViews',
        'hoursWatched',
        'timeStreamed',
      ],
      searchableColumns: [
        'displayName',
        'allTimePeakViewers',
        'avgViewers',
        'totalFollowers',
        'totalViews',
        'hoursWatched',
        'timeStreamed',
      ],
      filterableColumns: {
        displayName: [],
        byname: [],
        birthday: [],
        mainGame: [],
        country: [],
      },
      defaultSortBy: [['avgViewers', 'DESC']],
    })

    const names = paginated.data.map((s) => s.displayName)
    const bios = names.length
      ? await this.biosRepo.find({
          where: { displayName: In(names), del: 0 },
          select: ['displayName'],
        })
      : []
    const biosSet = new Set(bios.map((b) => b.displayName))

    return {
      ...paginated,
      data: paginated.data.map((s) => ({
        ...s,
        has_bio: biosSet.has(s.displayName),
      })) as (Streamer & {
        has_bio: boolean
      })[],
    }
  }

  async getOneByDisplayName(
    dName: string
  ): Promise<(Streamer & { bio: StreamerBio | null }) | null> {
    const streamer = await this.streamersRepo.findOne({ where: { displayName: dName } })

    if (!streamer) {
      throw new HttpException('Streamer not found', HttpStatus.NOT_FOUND)
    }

    const bio = await this.biosRepo.findOne({
      where: { displayName: dName, del: 0 },
      select: [
        'id',
        'displayName',
        'byname',
        'birthday',
        'mainGame',
        'weight',
        'height',
        'bio',
        'gallery',
        'socials',
      ],
    })

    return { ...streamer, bio: bio }
  }
}
