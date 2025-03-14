import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user123', description: '用户名' })
  @IsString()
  @Length(4, 20)
  username: string;

  @ApiProperty({ example: 'Passw0rd!', description: '密码' })
  @IsString()
  @Length(6, 20)
  password: string;
}
