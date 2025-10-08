import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { StreamerBio } from '../streamer-bio/streamer-bio.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity('streamers')
export class Streamer {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'xinqrmn' })
  @Column({ unique: true })
  username: string

  @ApiProperty({ example: 'Roman Galanov' })
  @Column()
  displayName: string

  @ApiProperty({ example: 'https://cdn.example.com/avatar.png', nullable: true })
  @Column({ nullable: true })
  avatarUrl: string

  @ApiProperty({ example: 'online', enum: ['online', 'offline', 'banned'] })
  @Column({ default: 'offline' })
  status: string

  @ApiProperty({ example: ['English', 'Russian'], type: [String] })
  @Column('simple-array', { nullable: true })
  languages: string[]

  @ApiProperty({ type: () => StreamerBio })
  @OneToOne(() => StreamerBio, (bio) => bio.streamer, { cascade: true })
  bio: StreamerBio
}
