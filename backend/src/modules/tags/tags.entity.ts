import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'int', default: 0 })
  del: number
}