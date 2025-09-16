import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Role } from '../roles/roles.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { RolesModule } from '../roles/roles.module'

@Module({
  imports: [RolesModule, TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}