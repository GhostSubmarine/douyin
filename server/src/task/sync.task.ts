import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/video/entities/like.entity";
import { Video } from "src/video/entities/video.entity";
import { Repository } from "typeorm";
import { Cron } from '@nestjs/schedule'; // 添加装饰器导入

@Injectable()
export class SyncTask {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>
  ) {}

  @Cron('0 3 * * *') // 每天凌晨3点执行
  async syncLikeCounts() {
    const videos = await this.videoRepository.find();
    
    for (const video of videos) {
      const actualCount = await this.likeRepository.count({
        where: { video: { id: video.id } }
      });
      
      if (actualCount !== video.likeCount) {
        await this.videoRepository.update(video.id, {
          likeCount: actualCount
        });
      }
    }
  }
}
