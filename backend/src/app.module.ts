import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import configuration, { IDatabase } from './common/configuration'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DataSource } from 'typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { RolesModule } from './modules/roles/roles.module'
import { AppLoggerMiddleware } from './app.interceptor'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config = configService.get<IDatabase>('database')
        return {
          type: 'postgres',
          timezone: 'Z',
          namingStrategy: new SnakeNamingStrategy(),
          bigNumberStrings: false,
          legacySpatialSupport: false,
          cache: false,
          ssl: false,
          migrationsRun: false,
          autoLoadEntities: true,
          synchronize: true,
          logging: ['error'],
          maxQueryExecutionTime: 10_000,
          requestTimeout: 30_000,
          pool: {
            max: 500,
          },
          options: {
            useUTC: true,
            encrypt: false,
            trustServerCertificate: true,
          },
          ...config!.postgres,
        } as TypeOrmModuleOptions
      },
      dataSourceFactory: async (options) => {
        return await new DataSource(options!).initialize()
      },
    }),
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
