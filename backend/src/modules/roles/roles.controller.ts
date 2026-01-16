import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesService } from './roles.service'
import { Respond } from 'src/common/response/response'
import { Roles } from 'src/common/decorators/roles.decorator'
import { JWTGuard } from '../auth/guards/jwt.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('get')
  @UseGuards(JWTGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Roles(['admin'])
  @ApiOperation({
    summary: 'Получение списка всех ролей',
    description:
      'Требуется токен авторизации. Только пользователи с ролью `admin` могут получать список всех ролей',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 401, description: 'Пользователь, осуществивший запрос, не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async getAllRoles() {
    const rolesList = await this.rolesService.getAllRoles()
    return Respond.one(rolesList)
  }
}
