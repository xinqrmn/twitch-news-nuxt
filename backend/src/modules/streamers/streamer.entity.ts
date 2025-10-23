import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('streamers')
export class Streamer {
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'xinqrmn' })
  @Column({ unique: true, type: 'varchar' })
  displayName: string

  @ApiProperty({ example: 420691 })
  @Column({ type: 'int', default: 0 })
  allTimePeakViewers: number

  @ApiProperty({ example: 1245 })
  @Column({ type: 'int', default: 0 })
  hoursWatched: number

  @ApiProperty({ example: 'https://cdn.example.com/avatar.png' })
  @Column({ type: 'varchar', default: 0 })
  logo: number

  @ApiProperty({ example: '+14256' })
  @Column({ type: 'varchar', default: 0 })
  followersGained: string

  @ApiProperty({ example: 42.6 })
  @Column({ type: 'real', default: 0 })
  timeStreamed: number

  @ApiProperty({ example: 1245121 })
  @Column({ type: 'int', default: 0 })
  totalFollowers: number

  @ApiProperty({ example: 124512 })
  @Column({ type: 'int', default: 0 })
  avgViewers: number

  @ApiProperty({ example: 12412556 })
  @Column({ type: 'int', default: 0 })
  totalViews: number
}
