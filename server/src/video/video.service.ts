import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Video)
    private videoRepository: Repository<Video>
  ) {}

  async getVideoFeed(page: number = 1, limit: number = 10) {
    const cacheKey = `feed_${page}_${limit}`;
    const cached = await this.cacheManager.get(cacheKey);
    
    if (cached) return cached;

    const [videos, total] = await this.videoRepository.findAndCount({
      relations: ['author'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const response = {
      data: videos,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit)
      }
    };

    await this.cacheManager.set(cacheKey, response, 60);
    return response;
  }
}