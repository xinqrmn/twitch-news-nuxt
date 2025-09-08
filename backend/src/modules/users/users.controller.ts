import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  HttpException,
  Get,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { userRegisterDto } from './dto/user-register.dto'
import { AuthGuard } from '@nestjs/passport'
import { userRegisterWithRolesDto } from 'src/modules/users/dto/user-register-with-roles.dto'
import { Request } from 'express'
import { Respond } from 'src/common/response/response'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Создание нового пользователя без указания ролей',
    description:
      'Создание нового пользователя с базовой ролью `Пользователь`, токен авторизации и права администратора для создания аккаунта не требуются',
  })
  @ApiResponse({ status: 200, description: 'Пользователь успешно создан' })
  @ApiResponse({
    status: 403,
    description: 'Пользователь с таким username или email уже существует',
  })
  async create(@Body() userRegisterDto: userRegisterDto) {
    await this.usersService.createUser(userRegisterDto)
    return Respond.ok()
  }

  @Post('createWithRoles')
  @UseGuards(UsersController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Создание нового пользователя с указанием ролей',
    description:
      'Требуется токен авторизации. Только пользователи с ролью `admin` могут создавать пользователя с заданием ролей',
  })
  @ApiResponse({ status: 200, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 401, description: 'Создающий не авторизован' })
  @ApiResponse({
    status: 403,
    description: 'Пользователь с таким username или email уже существует',
  })
  @ApiResponse({ status: 500, description: 'Недостаточно прав' })
  async createWithRoles(
    @Body() userRegisterWithRolesDto: userRegisterWithRolesDto,
    @Req() req: Request & { user?: { roles?: string[] } }
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (!roles.includes('admin')) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.usersService.createUserWithRoles(userRegisterWithRolesDto)
    return Respond.ok()
  }

  @Get('get')
  @UseGuards(UsersController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение списка всех пользователей',
    description:
      'Требуется токен авторизации. Только пользователи с ролью `admin` могут получать список всех пользователей',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 401, description: 'Пользователь, осуществивший запрос, не авторизован' })
  @ApiResponse({ status: 500, description: 'Недостаточно прав' })
  async getAllUsers(@Req() req: Request & { user?: { roles?: string[] } }) {
    const roles: string[] = req.user?.roles ?? []
    if (!roles.includes('admin')) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const users = await this.usersService.getAllUsers()
    return Respond.one(users)
  }

  @Delete('delete/:id')
  @UseGuards(UsersController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Мягкое удаление пользователя (del=1)',
    description:
      'Требуется токен авторизации. Удалить пользователя может только сам пользователь или пользователь с ролью `admin`',
  })
  @ApiResponse({ status: 200, description: 'Пользователь помечен как удаленный' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async deleteUser(
    @Param('id') id: number,
    @Req() req: Request & { user: { roles: string[]; id: number } }
  ) {
    await this.usersService.softDeleteUserById(id, {
      id: req.user.id,
      roles: req.user.roles ?? [],
    })

    return Respond.ok()
  }
}
