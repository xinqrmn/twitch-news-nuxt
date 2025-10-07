import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, In, Repository } from 'typeorm'
import { Post } from './posts.entity'
import { PostCreateDto } from './dto/post-create.dto'
import { PostUpdateDto } from './dto/post-update.dto'
import { generateSlug } from '../../common/slug/slug'
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate'
import { User } from '../users/users.entity'
import { Badge } from '../badges/badges.entity'
import { Tag } from '../tags/tags.entity'

@Injectable()
export class PostsService {
  constructor(
    @InjectDataSource() private readonly connection: DataSource,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>
  ) {}

  async create(
    createPostDto: PostCreateDto,
    username: string,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const slug = createPostDto.title ? generateSlug(createPostDto.title) : ''

      if (slug) {
        const exists = await m.findOne(Post, { where: { slug } })
        if (exists) {
          throw new HttpException('Пост с таким слагом уже существует!', HttpStatus.CONFLICT)
        }
      }

      const user = await m.findOne(User, { where: { username } })
      if (!user) {
        throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND)
      }

      const { tags, badges, ...rest } = createPostDto

      let tagEntities: any[] = []
      if (tags && tags.length > 0) {
        tagEntities = await m
          .getRepository('tags')
          .createQueryBuilder('tag')
          .where('tag.id IN (:...ids)', { ids: tags })
          .andWhere('tag.del = :del', { del: 0 })
          .getMany()
        if (tagEntities.length !== tags.length) {
          throw new HttpException('Один или несколько тегов не найдены!', HttpStatus.NOT_FOUND)
        }
      }

      let badgeEntities: any[] = []
      if (badges && badges.length > 0) {
        badgeEntities = await m
          .getRepository('badges')
          .createQueryBuilder('badge')
          .where('badge.id IN (:...ids)', { ids: badges })
          .andWhere('badge.del = :del', { del: 0 })
          .getMany()
        if (badgeEntities.length !== badges.length) {
          throw new HttpException('Один или несколько бейджей не найдены!', HttpStatus.NOT_FOUND)
        }
      }

      const post = m.create(Post, {
        slug,
        authorUsername: username,
        author: user,
        ...rest,
        tags: tagEntities,
        badges: badgeEntities,
      })

      await m.save(Post, post)
    })
  }

  async getAllPosts(query: PaginateQuery): Promise<Paginated<Post>> {
    const paginated = await paginate(query, this.postRepository, {
      relations: ['tags', 'badges', 'author'],
      select: [
        'id',
        'title',
        'subtitle',
        'author.username',
        'author.image_url',
        'tags.id',
        'tags.name',
        'badges.id',
        'badges.name',
        'created_at',
        'updated_at',
      ],
      sortableColumns: ['id', 'title', 'subtitle', 'author.username', 'created_at', 'updated_at'],
      searchableColumns: [
        'id',
        'title',
        'subtitle',
        'created_at',
        'updated_at',
        'author.username',
        'tags.name',
        'badges.name',
      ],
      defaultSortBy: [['created_at', 'DESC']],
    })
    return paginated
  }

  async findOneById(id: number): Promise<Post | null> {
    return await this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.author', 'author')
    .leftJoinAndSelect('post.tags', 'tags')
    .leftJoinAndSelect('post.badges', 'badges')
    .select([
      'post.id',
      'post.title',
      'post.subtitle',
      'post.slug',
      'post.metaDescription',
      'post.metaOgDescription',
      'post.metaOgTitle',
      'post.coverImageUrl',
      'post.content',
      'post.created_at',
      'post.updated_at',
      'author.username',
      'author.image_url',
      'tags.id',
      'tags.name',
      'badges.id',
      'badges.name',
    ])
    .where('post.id = :id', { id })
    .getOne();
  }

  async findOneBySlug(slug: string): Promise<Post | null> {
    return await this.postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.author', 'author')
    .leftJoinAndSelect('post.tags', 'tags')
    .leftJoinAndSelect('post.badges', 'badges')
    .select([
      'post.id',
      'post.title',
      'post.subtitle',
      'post.slug',
      'post.metaDescription',
      'post.metaOgDescription',
      'post.metaOgTitle',
      'post.coverImageUrl',
      'post.content',
      'post.created_at',
      'post.updated_at',
      'author.username',
      'author.image_url',
      'tags.id',
      'tags.name',
      'badges.id',
      'badges.name',
    ])
    .where('post.slug = :slug', { slug })
    .getOne();
  }

  async update(
    id: number,
    updatePostDto: PostUpdateDto,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const { tags, badges, ...updateData } = updatePostDto
      let slug: string | undefined
      const post = await m.findOne(Post, { where: { id }, relations: ['tags', 'badges'] })
      if (!post) {
        throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND)
      }

      if (updatePostDto.title) {
        slug = generateSlug(updatePostDto.title)
        if (post.slug !== slug) {
          const exists = await m.findOne(Post, { where: { slug: slug } })
          if (exists && exists.id !== id) {
            throw new HttpException('Пост с таким слагом уже существует!', HttpStatus.CONFLICT)
          }
        } else {
          slug = undefined // No change in slug
        }
      }

      let tagEntities: Tag[]
      if (tags) {
        if (tags.length === 0) {
          tagEntities = []
        } else {
          tagEntities = await m.findBy(Tag, { id: In(tags), del: 0 })
          await m
            .createQueryBuilder()
            .relation(Post, 'tags')
            .of(id)
            .addAndRemove(tagEntities ?? [], post.tags ?? [])
        }
      }

      let badgeEntities: Badge[]
      if (badges) {
        if (badges.length === 0) {
          badgeEntities = []
        } else {
          badgeEntities = await m.findBy(Badge, { id: In(badges), del: 0 })
          await m
            .createQueryBuilder()
            .relation(Post, 'badges')
            .of(id)
            .addAndRemove(badgeEntities ?? [], post.badges ?? [])
        }
      }

      // Only include slug in update if it is different than the existing one
      const updatePayload = { ...updateData }
      if (slug !== undefined) {
        updatePayload['slug'] = slug
      }

      await m.update(Post, { id }, updatePayload)
    })
  }

  async deleteById(id: number, manager: EntityManager = this.connection.manager): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      await m.delete(Post, { id })
      return
    })
  }
}
