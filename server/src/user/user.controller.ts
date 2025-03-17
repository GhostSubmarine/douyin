import { Body, Controller, Get, Post, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { VideoService } from '../video/video.service';
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly videoService: VideoService // 注入视频服务
  ) {}

  // 新增以下接口
  @Get('all')
  @ApiOperation({ summary: '获取全部用户' })
  @ApiResponse({ status: 200, description: '用户列表' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({ 
    status: 200, 
    description: '返回创建成功的用户基本信息（不含密码）' 
  })
  @ApiResponse({ status: 400, description: '无效的用户名或密码格式' })
  @ApiResponse({ status: 409, description: '用户名已存在' })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(
      createUserDto.username,
      createUserDto.password
    );
    // 过滤敏感字段
    const { password, ...result } = user;
    return result;
  }

  @Get('likes')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '获取用户点赞列表' })
  async getUserLikes(
    @Request() req:any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.videoService.getUserLikes(req.user.id, page, limit);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ status: 200, description: '用户详细信息' })
  @ApiResponse({ status: 401, description: '未授权' })
  async getCurrentUser(@Request() req) {
    const user = await this.userService.getUserById(req.user.id);
    const { password, ...result } = user;
    
    // 添加统计信息
    return {
      ...result,
      videoStats: {
        totalVideos: user.videos.length,
        totalLikes: user.totalLikes,
        totalCollects: user.totalCollects
      }
    };
  }
}
