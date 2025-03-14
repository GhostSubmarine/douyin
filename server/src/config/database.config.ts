import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config'; // 新增导入

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({ // 修改为函数形式
  type: 'postgres',
  host: configService.get<string>('DB_HOST'), 
  port: configService.get<number>('DB_PORT'), 
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  extra: {
    connectionLimit: 10
  }
})