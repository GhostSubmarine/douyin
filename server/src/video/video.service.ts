import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { User } from 'src/user/entities/user.entity';
import { rename } from 'fs-extra';
import fs, { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { uploadConfig }  from '../config/upload.config';
import { v4 as uuidv4 } from 'uuid';
import { CreateVideoDto } from './dto/create-video.dto';

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

  async uploadVideo(user: User, file: Express.Multer.File, createDto: CreateVideoDto) {
    // 添加文件验证
    if (!file?.path) {
      throw new BadRequestException('无效的文件上传');
    }

    // 确保目标目录存在
    const targetDir = join(__dirname, '../../uploads/videos');
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }
  
    // 生成新的文件名（添加用户ID前缀）
    const newFileName = `${user.id}_${Date.now()}${extname(file.originalname)}`;
    // 修复变量名拼写错误
    const newPath = join(targetDir, newFileName); // 原错误行：const newPath = join(uploadDir, newFileName);
    
    // 修复文件名引用
    const video = this.videoRepository.create({
      ...createDto,
      author: user,
      videoUrls: {
        original: `/videos/${newFileName}`, // 原错误行：${filename}
        hd: null,
        sd: null
      }
    });
  }
}