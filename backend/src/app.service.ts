import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  async getParser(): Promise<any> {
    const url = `http://streamers-parser:${process.env.PARSER_PORT}/parse`
    console.log('Вызываем парсер:', url)

    const res = await fetch(url)

    if (!res.ok) {
      throw new HttpException(
        `Ошибка парсера: ${res.status} ${res.statusText}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }

    const text = await res.text()
    console.log('Успешно, длина ответа:', text.length)

    try {
      return JSON.parse(text)
    } catch (e) {
      console.error('Ошибка парсина JSON:', e)
      throw new HttpException('Ошибка парсина JSON', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
