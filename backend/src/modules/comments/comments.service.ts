import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { Comment } from './comments.entity'
import { CommentCreateDto } from './dto/comment-create.dto'
import { Post as Posts } from '../posts/posts.entity'
import { User } from '../users/users.entity'
@Injectable()
export class CommentsService {
  constructor(
    @InjectDataSource() private readonly connection: DataSource,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>
  ) {}

  async create(
    commentCreateDto: CommentCreateDto,
    manager: EntityManager = this.connection.manager
  ): Promise<Comment> {
    return manager.transaction(async (m: EntityManager) => {
      // Find related post and author entities
      const post = await m.findOne(Posts, { where: { id: commentCreateDto.post_id } })
      if (!post) {
        throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND)
      }
      const author = await m.findOne(User, { where: { id: commentCreateDto.author_id } })
      if (!author) {
        throw new HttpException('Автор не найден', HttpStatus.NOT_FOUND)
      }

      let parentComment: Comment | null = null
      if (commentCreateDto.parent_comment_id) {
        parentComment = await m.findOne(Comment, {
          where: { id: commentCreateDto.parent_comment_id },
        })
        if (!parentComment) {
          throw new HttpException('Родительский комментарий не найден', HttpStatus.NOT_FOUND)
        }
      }

      const entity = m.create(Comment, {
        content: commentCreateDto.content,
        post: post,
        author: author,
        parent_comment: parentComment || undefined,
      })
      return await m.save(Comment, entity)
    })
  }

  async getByPost(
    postId: number,
    manager: EntityManager = this.connection.manager
  ): Promise<any[]> {
    const comments = await manager.find(Comment, {
      where: { post: { id: postId } },
      order: { created_at: 'DESC' },
      relations: ['author', 'parent_comment'],
    })

    if (!comments) {
      return []
    }

    const commentMap: Record<number, any> = {}
    comments.forEach((comment) => {
      commentMap[comment.id] = {
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        author: comment.author
          ? {
              id: comment.author.id,
              username: comment.author.username,
              image_url: comment.author.image_url,
            }
          : null,
        replies: [],
      }
    })

    const roots: any[] = []
    comments.forEach((comment) => {
      const mapped = commentMap[comment.id]
      if (comment.parent_comment && comment.parent_comment.id) {
        const parent = commentMap[comment.parent_comment.id]
        if (parent) {
          parent.replies.push(mapped)
        } else {
          roots.push(mapped)
        }
      } else {
        roots.push(mapped)
      }
    })
    return roots
  }

  async deleteById(
    id: number,
    requestingUser: { id: number; roles?: string[] },
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    const comment = await manager.findOne(Comment, { where: { id } })
    if (!comment) {
      throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND)
    }
    if (
      comment.author.id !== requestingUser.id ||
      !(requestingUser.roles?.includes('admin') || requestingUser.roles?.includes('news_editor'))
    ) {
      throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN)
    }
    return manager.transaction(async (m: EntityManager) => {
      await m.delete(Comment, { id })
      return
    })
  }
}
