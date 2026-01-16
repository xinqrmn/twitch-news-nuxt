import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Storage } from './storage.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    TypeOrmModule.forFeature([Storage]),
    AuthModule,
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
