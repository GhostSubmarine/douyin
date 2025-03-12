import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './controllers/video.controller';
import { VideoService } from './services/video.service';
import { Video } from './entities/video.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    CacheModule.register()
  ],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}