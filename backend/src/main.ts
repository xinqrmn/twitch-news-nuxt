import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { IApp } from './common/configuration'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors()

  const config = app.get(ConfigService).getOrThrow<IApp>('app')

  app.setGlobalPrefix('api')

  const documentationConfig = new DocumentBuilder()
    .setTitle('Twitch-News-Nest')
    .setDescription('API Twitch News')
    .setVersion('3.0')
    .build()
  const document = SwaggerModule.createDocument(app, documentationConfig)
  SwaggerModule.setup('docs', app, document)

  app.use(helmet())
  await app.listen(config.port, config.address, () =>
    console.info(`Server started on port: ${config.port} in ${process.env.NODE_ENV} mode`),
  )
}

// eslint-disable-next-line
bootstrap()
