import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: '返回JWT访问令牌',
    schema: {
      example: { access_token: "jwt_token_here" }
    }
  })
  @ApiResponse({ status: 401, description: '用户名或密码错误' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    
    return this.authService.login(user);
  }
}
