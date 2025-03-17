import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Video } from '../../video/entities/video.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // Must match Video.authorId type
  id: number;

  // Add relation definition
  @OneToMany(() => Video, video => video.author)
  videos: Video[];

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  // 添加统计字段（非数据库字段）
  @Column({ type: 'int', default: 0 })
  totalLikes: number;

  @Column({ type: 'int', default: 0 })
  totalCollects: number;
}