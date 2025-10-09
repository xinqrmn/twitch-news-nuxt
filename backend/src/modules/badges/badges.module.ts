import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Badge } from './badges.entity'
import { BadgesService } from './badges.service'
import { BadgesController } from './badges.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  exports: [BadgesService],
  providers: [BadgesService],
  controllers: [BadgesController],
})
export class BadgesModule {}


