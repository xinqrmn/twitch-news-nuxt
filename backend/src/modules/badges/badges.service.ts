import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { Badge } from './badges.entity'
import { BadgeCreateDto } from './dto/badge-create.dto'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js'
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate'

@Injectable()
export class BadgesService {
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
    @InjectRepository(Badge) private badgeRepo: Repository<Badge>
  ) {}

  async getAllBadges(query: PaginateQuery): Promise<Paginated<Badge>> {
    const paginated = await paginate(query, this.badgeRepo, {
      select: ['id', 'name'],
      where: { del: 0 },
      sortableColumns: ['id', 'name'],
      searchableColumns: ['id', 'name'],
      filterableColumns: {
        name: [],
      },
    })
    return paginated
  }

  async createBadge(
    dto: BadgeCreateDto,
    manager: EntityManager = this.connection.manager,
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const badgeExists = await m.find(Badge, {
        where: [{ name: dto.name }],
      })

      if (badgeExists.some((badge) => badge.del === 0))
        throw new HttpException('Бейдж уже существует!', HttpStatus.CONFLICT)

      const badge = m.create(Badge, {
        name: dto.name
      })

      await m.save(Badge, badge)

      return
    })
  }

  async softDeleteBadge(
    badgeIdToDelete: number,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const badge = await m.findOne(Badge, { where: { id: badgeIdToDelete } })
      if (!badge || badge.del === 1) {
        throw new HttpException('Бейдж не найден', HttpStatus.NOT_FOUND)
      }

      const updatePayload: QueryDeepPartialEntity<Badge> = { del: 1 }
      await m.update(Badge, { id: badgeIdToDelete }, updatePayload)

      return
    })
  }

  async editBadgeById(
    dto: BadgeCreateDto,
    badgeId: number,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const badge = await m.findOne(Badge, {where: {id: badgeId }})
      if (!badge || badge.del === 1){
        throw new HttpException('Бейдж не найден', HttpStatus.NOT_FOUND)
      }

      const updatePayload: QueryDeepPartialEntity<Badge> = {name: dto.name}

      await m.update(Badge, { id: badgeId }, updatePayload)
      return
    })
  }
}


