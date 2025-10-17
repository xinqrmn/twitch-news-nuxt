import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('parser-data')
export class ParserData {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({unique: true, type: 'varchar'})
  displayName: string

  @Column({type: 'int', default: 0})
  allTimePeakViewers: number

  @Column({type: 'int', default: 0})
  hoursWatched: number

  @Column({type: 'varchar', default: 0})
  logo: number

  @Column({type: 'varchar', default: 0})
  followersGained: string

  @Column({type: 'real', default: 0})
  timeStreamed: number

  @Column({type: 'int', default: 0})
  totalFollowers: number

  @Column({type: 'int', default: 0})
  totalViews: number

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date
}