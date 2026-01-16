import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Role } from '../roles/roles.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { RolesModule } from '../roles/roles.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
