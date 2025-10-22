import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity('streamer_bio')
export class StreamerBio {
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'xinqrmn' })
  @Column({ unique: true, type: 'varchar' })
  displayName: string

  @ApiProperty({ example: 'xinqrmn' })
  @Column({ type: 'varchar', nullable: true })
  byname: string

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

  @Column({ type: 'int', default: 0 })
  del: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date
}
