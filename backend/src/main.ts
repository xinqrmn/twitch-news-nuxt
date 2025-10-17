import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { IApp } from './common/configuration'
import { ConsoleLogger, ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { json, urlencoded } from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'TN-Nest',
    }),
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
    })
  )

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })

  const config = app.get(ConfigService).getOrThrow<IApp>('app')

  app.setGlobalPrefix('api')

  if (process.env.NODE_ENV !== 'production') {
    const documentationConfig = new DocumentBuilder()
      .setTitle('Twitch-News-Nest')
      .setDescription('API Twitch News')
      .setVersion('3.0')
      .build()
    const document = SwaggerModule.createDocument(app, documentationConfig)
    SwaggerModule.setup('docs', app, document)
  }


  app.use(helmet())
  app.use(json())
  app.use(cookieParser())
  app.use(urlencoded({ extended: true }))
  await app.listen(config.port, config.address, () =>
    console.info(`Server started on port: ${config.port} in ${process.env.NODE_ENV} mode`)
  )
}

// eslint-disable-next-line
bootstrap()
