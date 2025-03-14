import { Entity, Column, ManyToOne, Index, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
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
    hd: string | null;
    sd: string | null;
  };

  @ManyToOne(() => User, user => user.videos)
  @JoinColumn({ name: 'author_id' })
  author: User;

  // 添加显式的外键列定义
  @Column({ name: 'author_id' })
  authorId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @Column({ 
    type: 'varchar',
    length: 255,
    comment: '视频封面URL'
  })
  coverUrl: string;

  @Column({
    type: 'enum', 
    enum: ['draft', 'published'],
    default: 'draft'
  })
  status: string;
}