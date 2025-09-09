import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from '../roles/roles.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ unique: true, nullable: true })
  username: string

  @Column()
  password_hash: string

  @Column({ type: 'int', default: 0 })
  del: number

  @Column({ type: 'varchar', length: 2048, nullable: true })
  image_url: string | null

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[]
}
