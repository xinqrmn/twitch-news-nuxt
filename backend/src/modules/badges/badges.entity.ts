import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'int', default: 0 })
  del: number
}


