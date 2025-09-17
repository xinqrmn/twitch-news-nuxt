import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import {User} from '../users/users.entity'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  cyrillic: string

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}