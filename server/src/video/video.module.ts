import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { Like } from './entities/like.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { Collect } from './entities/collect.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, Like, Collect]),
    CacheModule.register(),
    MulterModule.register({
      dest: join(__dirname, '../../uploads/tmp'),
      limits: { fileSize: 100 * 1024 * 1024 }
    })
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService]
})
export class VideoModule {}