import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from '../../../common/decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  matchRoles(allowedRoles: string | string[], userRoles: string[]) {
    return userRoles.some((role) => allowedRoles.includes(role))
  }
  
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler())
    console.log('zxc')
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchRoles(roles, user.roles)
  }
}
