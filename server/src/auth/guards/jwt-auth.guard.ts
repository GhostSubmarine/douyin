import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): Observable<boolean> {
    return super.canActivate(context) as Observable<boolean>;
  }

  handleRequest(err: any, user: any, info: any) {
    // 新增调试日志
    console.log('JWT 验证信息:', { err, user, info });
    
    if (err || !user) {
      console.error('JWT 验证失败详情:', {
        error: err?.message,
        info: info?.message,
        timestamp: new Date().toISOString()
      });
      throw (err ||
        new UnauthorizedException({
          code: 401,
          message: '无效或过期的访问令牌'
        }));
    }
    return user;
  }
}
