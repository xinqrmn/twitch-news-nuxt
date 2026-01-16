import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../auth.service'

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private authService: AuthService
  ) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const req_token = context.switchToHttp().getRequest().cookies.access_token as string
    const user = this.authService.verify(req_token)
    if (!user) throw new HttpException('Пользователь не авторизован!', HttpStatus.UNAUTHORIZED)
    context.switchToHttp().getRequest().user = user
    return super.canActivate(context)
  }
}
