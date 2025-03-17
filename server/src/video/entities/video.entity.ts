import { Entity, Column, ManyToOne, Index, JoinColumn, CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Like } from './like.entity';
import { Collect } from './collect.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
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
    comment: '视频封面URL',
    default: ''
  })
  coverUrl: string;

  @Column({
    type: 'enum', 
    enum: ['draft', 'published'],
    default: 'draft'
  })
  status: string;

  @OneToMany(() => Like, like => like.video)
  likes: Like[];

  @OneToMany(() => Collect, collect => collect.video)
  collects: Collect[];

  // 添加统计字段（可选）
  @Column({ default: 0 })
  likeCount: number;

  // 添加统计字段（可选）
  @Column({ default: 0 })
  collectCount: number;
}