import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RolesService } from './roles.service'
import { AuthGuard } from '@nestjs/passport'
import { Respond } from 'src/common/response/response'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

	private static JwtAuthGuard = class extends AuthGuard('jwt') {}

	@Get('get')
  @UseGuards(RolesController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение списка всех ролей',
    description:
      'Требуется токен авторизации. Только пользователи с ролью `admin` могут получать список всех ролей',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 401, description: 'Пользователь, осуществивший запрос, не авторизован' })
  @ApiResponse({ status: 500, description: 'Недостаточно прав' })
	async getAllRoles(@Req() req: Request & {user?: {roles?: string[]}}) {
		const roles: string[] = req.user?.roles ?? []

		if (!roles.includes('admin')) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const rolesList = await this.rolesService.getAllRoles()
    return Respond.one(rolesList)
	}
}
