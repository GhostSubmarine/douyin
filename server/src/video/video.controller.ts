import { Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors, Body, Request, Param } from '@nestjs/common';
import { VideoService } from './video.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVideoDto } from './dto/create-video.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video', {
    limits: {
      fileSize: 1024 * 1024 * 100 // 限制上传文件大小为100MB
    }
  }))
  @ApiOperation({ summary: '上传视频' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '视频文件及元数据',
    schema: {
      type: 'object',
      properties: {
        video: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string', example: '我的第一个视频' },
        description: { type: 'string', example: '视频描述' }
      },
      required: ['video', 'title']
    }
  })
  @ApiResponse({ status: 200, description: '视频上传成功' })
  @ApiResponse({ status: 400, description: '文件格式错误或参数无效' })
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateVideoDto,
    @Request() req
  ) {
    return this.videoService.uploadVideo(req.user, file, createDto);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  async likeVideo(
    @Param('id') videoId: string,
    @Request() req
  ) {
    return this.videoService.likeVideo(req.user.id, videoId);
  }

  @Post(':id/unlike')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '取消点赞' })
  async unlikeVideo(
    @Param('id') videoId: string,
    @Request() req
  ) {
    return this.videoService.unlikeVideo(req.user.id, videoId);
  }
}