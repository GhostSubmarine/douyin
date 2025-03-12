import { Controller, Get, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('feed')
  @ApiOperation({ summary: '获取视频流' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: '视频流数据' })
  async getVideoFeed(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.videoService.getVideoFeed(page, limit);
  }
}