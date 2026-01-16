import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './roles.entity'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => AuthModule)],
  exports: [RolesService],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
