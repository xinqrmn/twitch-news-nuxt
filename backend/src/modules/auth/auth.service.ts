import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    throw new UnauthorizedException('Invalid Credentials')
  }

  async login(loginDto: {email: string, password: string}) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    const payload = {email: user.email, roles: user.roles.map(r => r.name)}
    console.log(this.jwtService.sign(payload))
    return 'PIXAS'
    // return {
    //   access_token: this.jwtService.sign(payload),
    // }
  }
}