import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { ParserExecutions } from './parser.entity'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Streamer } from '../streamers/streamer.entity'

@Injectable()
export class ParserService {
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
    @InjectRepository(ParserExecutions) private parserRepo: Repository<ParserExecutions>,
    @InjectRepository(Streamer) private streamerRepo: Repository<Streamer>
  ) {}

  private logger = new Logger(ParserService.name)

  // Парсер вызывается каждый день в 0:00
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'twitch-parser',
    timeZone: 'Europe/Moscow',
  })
  async parseStreamers(
    callingUser: string,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    const startTime = performance.now()
    let url = `http://localhost:${process.env.PARSER_PORT}/parse`
    if (process.env.NODE_ENV === 'production') {
      url = `http://streamers-parser:${process.env.PARSER_PORT}/parse`
    }
    this.logger.log(`Начало парсинга`)

    const res = await fetch(url)

    if (!res.ok) {
      this.logger.log(`Ошибка парсинга: ${res.status} ${res.statusText}`)
      throw new HttpException(
        `Ошибка парсера: ${res.status} ${res.statusText}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    let json: { count: number; data: Partial<Streamer>[] }

    try {
      json = (await res.json()) as { count: number; data: Partial<Streamer>[] }
      this.logger.log('JSON получен, количество обьектов: ', json.count)
    } catch (e) {
      this.logger.error('Ошибка парсинга JSON:', e)
      throw new HttpException('Ошибка парсинга JSON', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return manager.transaction(async (m: EntityManager) => {
      // await m.clear(Streamer)
      await m.query('TRUNCATE TABLE streamers RESTART IDENTITY')
      const sliceSize = 100
      for (let i = 0; i < json.data.length; i += sliceSize) {
        const slice = json.data.slice(i, i + sliceSize)
        try {
          await m.insert(Streamer, slice)
          this.logger.log(
            `Обработан слайс ${i / sliceSize + 1}/${Math.ceil(json.data.length / sliceSize)}`
          )
        } catch (sliceError) {
          this.logger.error(`Ошибка в слайсе ${i / sliceSize + 1}:`, sliceError)
          throw sliceError
        }
      }
      const endTime = performance.now()
      this.logger.log(`Парсинг завершен за ${(endTime - startTime) / 1000} секунд`)
      await m.insert(ParserExecutions, {
        caller: callingUser ?? 'SYSTEM',
        execTime: (endTime - startTime) / 1000,
      })
    })
  }
}
