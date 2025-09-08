import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[]
}