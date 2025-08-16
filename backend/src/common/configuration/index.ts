export interface IApp {
  address: string
  port: number
}

export interface IDatabase {
  postgres: {
    host: string
    port: number
    username: string
    password: string
    database: string
  }
}

export interface IRollbar {
  token: string
  environment: string
}

export interface IHttp {
  timeout: number
  maxRedirects: number
}

export interface IConfiguration {
  app: IApp
  database: IDatabase
  http: IHttp
  rollbar: IRollbar
}

const config = (): IConfiguration => ({
  app: {
    address: process.env.APP_ADDR ?? '0.0.0.0',
    port: Number.parseInt(process.env.APP_PORT ?? '9000'),
  },
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: Number.parseInt(process.env.POSTGRES_PORT ?? '5432'),
      username: process.env.POSTGRES_USERNAME ?? 'user',
      password: process.env.POSTGRES_PASSWORD ?? 'password',
      database: process.env.POSTGRES_DATABASE ?? 'postgres',
    },
  },
  http: {
    timeout: Number.parseInt(process.env.HTTP_TIMEOUT ?? '5000'),
    maxRedirects: Number.parseInt(process.env.HTTP_MAX_REDIRECTS ?? '10'),
  },
  rollbar: {
    token: process.env.ROLLBAR_TOKEN ?? '',
    environment: process.env.ROLLBAR_ENVIRONMENT ?? 'development',
  },
})

export default config
