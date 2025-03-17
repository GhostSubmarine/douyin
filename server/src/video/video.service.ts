import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { User } from 'src/user/entities/user.entity';
import { rename } from 'fs-extra';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { extname, join } from 'path';
import { CreateVideoDto } from './dto/create-video.dto';
import { Like } from './entities/like.entity';
import { Collect } from './entities/collect.entity';
@Injectable()
export class VideoService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    @InjectRepository(Like) // 注入Like仓库
    private likeRepository: Repository<Like>,
    @InjectRepository(Collect) // 注入Collect仓库
    private collectRepository: Repository<Like>
  ) { }

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

    // 修复目录检查逻辑
    const targetDir = join(__dirname, '../../uploads/videos');
    if (!existsSync(targetDir)) { // 移除fs.前缀
      mkdirSync(targetDir, { recursive: true }); // 移除fs.前缀
    }

    // 生成新的文件名（添加用户ID前缀）
    const newFileName = `${user.id}_${Date.now()}${extname(file.originalname)}`;
    // 修复变量名拼写错误
    const newPath = join(targetDir, newFileName); // 原错误行：const newPath = join(uploadDir, newFileName);

    // 修复文件名引用
    // 移动文件到目标目录
    try {
      await rename(file.path, newPath); // 关键修复：添加文件移动操作
    } catch (error) {
      throw new InternalServerErrorException('文件存储失败');
    }

    // 创建并保存视频记录到数据库
    try {
      const video = this.videoRepository.create({
        ...createDto,
        author: {
          id: user.id
        },
        videoUrls: {
          original: `/videos/${newFileName}`,
          hd: null,
          sd: null
        }
      });
      const savedVideo = await this.videoRepository.save(video);
      console.log(`视频记录创建成功 ID: ${savedVideo.id}`);
      return savedVideo;
    } catch (error) {
      console.error('数据库保存失败:', error);  // 添加详细错误日志
      unlinkSync(newPath);
      throw new InternalServerErrorException('视频记录创建失败: ' + error.message);
    }
  }

  async likeVideo(userId: number, videoId: string) {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
      relations: ['likes']
    });
    if (!video) {
      throw new NotFoundException('视频不存在');
    }
    // 检查是否已点赞
    const existingLike = video.likes.find(like => like.user.id === userId);
    if (existingLike) {
      throw new BadRequestException('已点赞过该视频');
    }
  
    // 创建新点赞
    const newLike = this.likeRepository.create({
      user: { id: userId },
      video: { id: videoId }
    });
    
    await this.likeRepository.save(newLike);
    
    // 更新计数
    return this.videoRepository.update(videoId, {
      likeCount: () => "likeCount + 1"
    });
  }

  async unlikeVideo(userId: number, videoId: string) {
    const like = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        video: { id: videoId }
      }
    });
  
    if (!like) {
      throw new NotFoundException('未找到点赞记录');
    }
  
    await this.likeRepository.remove(like);
    
    return this.videoRepository.update(videoId, {
      likeCount: () => "GREATEST(likeCount - 1, 0)"
    });
  }

  async collectVideo(userId: number, videoId: string) {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
      relations: ['collects']
    });
    if (!video) {
      throw new NotFoundException('视频不存在');
    }
    // 检查是否已点赞
    const existingCollect = video.collects.find(collect => collect.user.id === userId);
    if (existingCollect) {
      throw new BadRequestException('已收藏过该视频');
    }
  
    // 创建新点赞
    const newCollect = this.collectRepository.create({
      user: { id: userId },
      video: { id: videoId }
    });
    
    await this.likeRepository.save(newCollect);
    
    // 更新计数
    return this.videoRepository.update(videoId, {
      collectCount: () => "collectCount + 1"
    });
  }

  async uncollectVideo(userId: number, videoId: string) {
    const collect = await this.collectRepository.findOne({
      where: {
        user: { id: userId },
        video: { id: videoId }
      }
    });
  
    if (!collect) {
      throw new NotFoundException('未找到点赞记录');
    }
  
    await this.collectRepository.remove(collect);
    
    return this.videoRepository.update(videoId, {
      collectCount: () => "GREATEST(collectCount - 1, 0)"
    });
  }

  async getVideoDetail(videoId: string, userId?: number) {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
      relations: ['author']
    });
  
    if (!video) throw new NotFoundException('视频不存在');
  
    const detail = { 
      ...video,
      isLiked: false
     };
    
    if (userId) {
      const isLiked = await this.likeRepository.exist({
        where: {
          user: { id: userId },
          video: { id: videoId }
        }
      });
      detail.isLiked = isLiked;
    }
  
    return detail;
  }

  async getUserLikes(userId: number, page: number, limit: number) {
    const [likes, total] = await this.likeRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['video', 'video.author'],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return {
      data: likes.map(like => like.video),
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}