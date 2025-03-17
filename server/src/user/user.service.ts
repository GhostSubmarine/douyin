import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // 新增获取全部用户方法
  async getAllUsers() {
    return this.userRepository.find({
      select: ['id', 'username', 'avatar', 'createdAt', 'password'], // 排除敏感字段
      order: { createdAt: 'DESC' }
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(username: string, password: string) {
    // 添加用户名格式校验
    if (!/^[a-zA-Z0-9_-]{4,20}$/.test(username)) {
      throw new BadRequestException('用户名必须为4-20位字母数字组合');
    }

    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('创建用户对象:', { username, avatar: 'default-avatar.png' }); // 新增日志
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      avatar: 'default-avatar.png'
    });
    
    try {
      const savedUser = await this.userRepository.save(user);
      console.log('用户存储成功:', savedUser.id); // 新增日志
      return savedUser;
    } catch (e) {
      console.error('用户存储失败:', e);
      throw new InternalServerErrorException('用户创建失败');
    }
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async validatePassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }

  // 新增：带敏感信息过滤的用户查询
  async findUserProfile(id: number) {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: ['id', 'username', 'avatar', 'createdAt']
    });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }

  // 改进头像更新方法
  async updateAvatar(userId: number, avatarUrl: string) {
    const result = await this.userRepository.update(
      { id: userId },
      { avatar: avatarUrl }
    );
    
    if (result.affected === 0) {
      throw new NotFoundException('用户不存在');
    }
    return this.findUserProfile(userId);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.videos', 'videos')
      .loadRelationCountAndMap('user.totalLikes', 'videos.likes')
      .loadRelationCountAndMap('user.totalCollects', 'videos.collects')
      .where('user.id = :id', { id })
      .getOne();
  
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    
    // 计算总数
    user.totalLikes = user.videos.reduce((sum, video) => sum + video.likeCount, 0);
    user.totalCollects = user.videos.reduce((sum, video) => sum + video.collectCount, 0);
  
    return user;
  }
}
