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
import { StreamerBioModule } from './modules/streamer-bio/streamer-bio.module'
import { StreamersModule } from './modules/streamers/streamers.module'
import { TagsModule } from './modules/tags/tags.module'
import { BadgesModule } from './modules/badges/badges.module'
import { PostsModule } from './modules/posts/posts.module'
import { CommentsModule } from './modules/comments/comments.module'
import { ParserModule } from './modules/parser/parser.module'
import { ScheduleModule } from '@nestjs/schedule'

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
          migrationsRun: true,
          autoLoadEntities: true,
          migrationsTableName: 'migrations',
          synchronize: false,
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/*{.js}'],
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
    ScheduleModule.forRoot(),
    AuthModule,
    RolesModule,
    UsersModule,
    StreamersModule,
    StreamerBioModule,
    TagsModule,
    BadgesModule,
    PostsModule,
    CommentsModule,
    ParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
