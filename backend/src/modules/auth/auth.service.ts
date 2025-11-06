import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user || user.del === 1) {
      return undefined
    }
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return user
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    if (!user) {
      throw new HttpException('Проверьте введенные данные', HttpStatus.FORBIDDEN)
    }
    const payload = {
      email: user.email,
      username: user.username,
      roles: user.roles.map((r) => r.name),
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async cmsLogin(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    if (!user) {
      throw new HttpException('Проверьте введенные данные', HttpStatus.FORBIDDEN)
    }

    const cmsRoles = [
      'admin',
      'news_author',
      'news_editor',
      'streamer_bio_author',
      'streamer_bio_editor',
    ]
    const userRoles = user.roles.map((r) => r.name)
    const hasCMSAccess = userRoles.some((role) => cmsRoles.includes(role))

    if (!hasCMSAccess) {
      throw new HttpException('Недостаточно прав для доступа к CMS', HttpStatus.FORBIDDEN)
    }

    const payload = {
      email: user.email,
      username: user.username,
      roles: userRoles,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
