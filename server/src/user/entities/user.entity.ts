import { Entity, Column, OneToMany } from 'typeorm';
import { Video } from '../../video/entities/video.entity';

@Entity()
export class User {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @OneToMany(() => Video, video => video.author)
  videos: Video[];
}