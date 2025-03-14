import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { CacheModule } from '@nestjs/cache-manager';
// 替换原有 MulterModule 导入
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    CacheModule.register(),
    MulterModule.register({
      dest: join(__dirname, '../../uploads/tmp'),
      limits: { fileSize: 100 * 1024 * 1024 }
    })
  ],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}