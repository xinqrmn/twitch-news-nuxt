import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource, EntityManager } from 'typeorm'
import { Post } from './posts.entity'

@Injectable()
export class PostsScheduler {
  private readonly logger = new Logger(PostsScheduler.name)

  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async publishDuePosts(manager: EntityManager = this.connection.manager): Promise<void> {
    this.logger.log('Запуск отложенного постинга')
    const now = new Date()
    await manager.transaction(async (m) => {
      const duePosts = await m
        .getRepository(Post)
        .createQueryBuilder('post')
        .where('post.is_published = :isPublished', { isPublished: false })
        .andWhere('post.publish_at IS NOT NULL')
        .andWhere('post.publish_at <= :now', { now })
        .getMany()

      if (duePosts.length === 0) {
        this.logger.log('Отложенных постов не найдено!')
        return
      }

      const ids = duePosts.map((p) => p.id)
      await m
        .createQueryBuilder()
        .update(Post)
        .set({ isPublished: true, publishedAt: now, publishAt: null })
        .whereInIds(ids)
        .execute()

      this.logger.log(`Опубликовано ${ids.length} постов: ID: ${ids.join(', ')}`)
      return
    })
  }
}


