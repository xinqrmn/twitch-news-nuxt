import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import * as process from 'node:process'
import { UsersModule } from '../users/users.module'
import { JWTGuard } from './guards/jwt.guard'
import { RolesGuard } from './guards/roles.guard'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JWTGuard, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, JWTGuard, RolesGuard],
})
export class AuthModule {}