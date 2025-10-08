import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Streamer } from '../streamers/streamer.entity'

@Entity('streamer_bio')
export class StreamerBio {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'date', nullable: true })
  birthday: Date

  @Column({ nullable: true })
  mainGame: string

  @Column({ type: 'int', nullable: true })
  weight: number

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  city: string

  @Column({ type: 'int', nullable: true })
  height: number

  @Column({ type: 'text', nullable: true })
  bio: string

  @Column('simple-array', { nullable: true })
  gallery: string[]

  @Column('json', { nullable: true })
  socials: { type: string; url: string }[]

  @OneToOne(() => Streamer, (streamer) => streamer.bio, { onDelete: 'CASCADE' })
  @JoinColumn()
  streamer: Streamer
}
