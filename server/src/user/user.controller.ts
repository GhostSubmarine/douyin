import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
