import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Video } from './video.entity';

@Entity()
@Unique(['user', 'video']) // 防止重复点赞
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // 添加级联删除
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Video, video => video.likes)
  @JoinColumn({ name: 'video_id' })
  video: Video;

  // 添加显式字段类型定义
  @Column({ name: 'video_id', type: 'uuid' })
  videoId: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;
}
