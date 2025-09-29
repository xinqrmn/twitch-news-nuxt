import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
import { User } from '../users/users.entity'
import { Post } from '../posts/posts.entity'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Post, { nullable: false })
  post: Post

  @ManyToOne(() => User, { nullable: false })
  author: User

  @ManyToOne(() => Comment, (comment) => comment.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_comment_id' })
  parent_comment: Comment

  @Column({ type: 'text' })
  content: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date
}
