import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Tag } from '../tags/tags.entity'
import { Badge } from '../badges/badges.entity'
import { User } from '../users/users.entity' // Предполагается, что у вас есть сущность User

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar', unique: true })
  slug: string

  @Column({ type: 'varchar', nullable: true })
  subtitle: string

  @Column({ type: 'varchar', length: 512, nullable: true })
  metaDescription: string

  @Column({ type: 'varchar', length: 512, nullable: true })
  metaOgDescription: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  metaOgTitle: string

  @Column({ type: 'varchar', nullable: true })
  coverImageUrl: string

  @ManyToOne(() => User, { nullable: false, eager: true })
  author: User

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tags: Tag[]

  @ManyToMany(() => Badge, { eager: true })
  @JoinTable()
  badges: Badge[]

  @Column({ type: 'text' })
  content: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date
}

