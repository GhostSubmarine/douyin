import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'; // 新增导入
import { UserModule } from '../user/user.module'; // Add this import
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule, // Add this line
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController], // 添加控制器注册
  providers: [
    // 添加配置服务依赖
    ConfigService,
    AuthService,
    JwtStrategy,
  ],
  exports: [
    JwtModule,
    AuthService // 导出认证服务以便其他模块使用
  ]
})
export class AuthModule {}