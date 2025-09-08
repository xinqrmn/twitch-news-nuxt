import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { Respond } from 'src/common/response/response'
import { Response } from 'express'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
    const { access_token } = await this.authService.login(loginDto)
    if (access_token) {
      res.cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      })
    }
    return Respond.ok()
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
    return Respond.ok()
  }
}
