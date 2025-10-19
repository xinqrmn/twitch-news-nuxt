import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { config } from 'dotenv'

config({path: '.env'})

export const AppDataSource = new DataSource({
  type: 'postgres',
	host: process.env.POSTGRES_HOST ?? 'localhost',
	port: Number.parseInt(process.env.POSTGRES_PORT ?? '5432'),
	username: process.env.POSTGRES_USERNAME ?? 'user',
	password: process.env.POSTGRES_PASSWORD ?? 'password',
	database: process.env.POSTGRES_DATABASE ?? 'postgres',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logging: true,
})