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
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return user
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    if (!user) {
      throw new HttpException('Проверьте введенные данные', HttpStatus.FORBIDDEN)
    }
    const payload = { email: user.email, roles: user.roles.map((r) => r.name) }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
