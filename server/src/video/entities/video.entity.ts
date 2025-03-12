import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
@Index(['createdAt', 'viewCount'])
export class Video {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb' })
  videoUrls: {
    original: string;
    hd: string;
    sd: string;
  };

  @ManyToOne(() => User, user => user.videos)
  author: User;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ type: 'tsvector', nullable: true })
  searchVector: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}