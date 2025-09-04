import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { Respond } from 'src/common/response/response'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return Respond.one(await this.authService.login(loginDto))
  }
}
