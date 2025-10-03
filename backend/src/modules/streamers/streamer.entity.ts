import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { StreamerBio } from '../streamer-bio/streamer-bio.entity';

@Entity('streamers')
export class Streamer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('simple-array', { nullable: true })
  languages: string[];

  @OneToOne(() => StreamerBio, (bio) => bio.streamer, { cascade: true })
  bio: StreamerBio;
}
