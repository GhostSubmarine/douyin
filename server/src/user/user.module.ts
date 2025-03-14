import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // 新增导入

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController], // 添加控制器
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
