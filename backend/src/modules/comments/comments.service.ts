import { Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { Comment } from './comments.entity'
import { CommentCreateDto } from './dto/comment-create.dto'

@Injectable()
export class CommentsService {
  constructor(
    @InjectDataSource() private readonly connection: DataSource,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    commentCreateDto: CommentCreateDto,
    manager: EntityManager = this.connection.manager
  ): Promise<Comment> {
    return manager.transaction(async (m: EntityManager) => {
      const entity = m.create(Comment, commentCreateDto)
      return await m.save(Comment, entity)
    })
  }

  async getByPost(
    postId: number,
    manager: EntityManager = this.connection.manager
  ): Promise<Comment[]> {
    return await manager.find(Comment, {
      where: { post: { id: postId } },
      order: { created_at: 'DESC' },
    })
  }

  async deleteById(
    id: number,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      await m.delete(Comment, { id })
      return
    })
  }
}


