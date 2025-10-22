import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { Tag } from './tags.entity'
import { TagCreateDto } from './dto/tag-create.dto'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js'

@Injectable()
export class TagsService {
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
    @InjectRepository(Tag) private tagRepo: Repository<Tag>
  ) {}

  async getAllTags(): Promise<Tag[]> {
    const tags = await this.tagRepo.find({where: {del: 0}})

    return tags
  }

  async createTag(
    dto: TagCreateDto,
    manager: EntityManager = this.connection.manager,
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const tagExists = await m.findOne(Tag, {
        where: [{name : dto.name}]
      })

      if (tagExists) throw new HttpException('Тег уже существует!', HttpStatus.CONFLICT)

      const tag = m.create(Tag, {
        name: dto.name
      })

      await m.save(Tag, tag)

      return
    })
  }

  async softDeleteTag(
    tagIdToDelete: number,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const tag = await m.findOne(Tag, { where: { id: tagIdToDelete } })
      if (!tag || tag.del === 1) {
        throw new HttpException('Тег не найден', HttpStatus.NOT_FOUND)
      }

      const updatePayload: QueryDeepPartialEntity<Tag> = { del: 1 }
      await m.update(Tag, { id: tagIdToDelete }, updatePayload)

      return
    })
  }

  async editTagById(
    dto: TagCreateDto,
    tagId: number,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const tag = await m.findOne(Tag, {where: {id: tagId }})
      if (!tag || tag.del === 1){
        throw new HttpException('Тег не найден', HttpStatus.NOT_FOUND)
      }

      const updatePayload: QueryDeepPartialEntity<Tag> = {name: dto.name}

      await m.update(Tag, { id: tagId }, updatePayload)
      return
    })
  }
}
