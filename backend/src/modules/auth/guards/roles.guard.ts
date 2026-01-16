import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from '../../../common/decorators/roles.decorator'

@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}

  matchRoles(allowedRoles: string | string[], userRoles: string[]) {
    if (userRoles.includes('admin')) return true
    return userRoles.some((role) => allowedRoles.includes(role))
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user

    const result = this.matchRoles(roles, user.roles)

    if (!result) throw new HttpException('Недостаточно прав!', HttpStatus.FORBIDDEN)

    return result
  }
}
