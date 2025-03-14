import { IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @Matches(/^[a-zA-Z0-9_-]{4,20}$/, { 
    message: '用户名必须为4-20位字母数字组合' 
  })
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: '密码必须包含大小写字母和数字，且至少8位'
  })
  password: string;
}
