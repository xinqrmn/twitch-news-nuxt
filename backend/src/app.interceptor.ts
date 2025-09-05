import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')
  private readonly MAX_LOG_BODY_LENGTH = 2048 // 2 KB

  use(request: Request, response: Response, next: NextFunction): void {
    const ip = request.ip
    const method: string = request.method
    const url: string = (request as any).originalUrl
    const body: unknown =
      typeof request.body === 'object' && request.body !== null ? { ...request.body } : undefined

    // Сохраняем оригинальный send
    const originalSend: (body?: any) => Response = response.send.bind(response)
    let responseBody: unknown

    response.send = function (this: Response, bodyToSend?: unknown): Response {
      responseBody = bodyToSend
      originalSend.call(this, bodyToSend)
      return this
    }

    response.on('close', () => {
      const { statusCode } = response

      const reqBodyStr = method === 'GET' ? 'none' : this.safeStringify(body)
      const resBodyStr = this.safeStringify(responseBody)

      this.logger.log(
        `${method} ${url}\n RESPONSE CODE: ${statusCode}\n FROM: ${ip}\n REQ BODY: ${reqBodyStr} \n RES BODY: ${resBodyStr}`
      )
    })

    next()
  }

  private safeStringify(data: any): string {
    try {
      let str = typeof data === 'string' ? data : JSON.stringify(data)
      if (str.length > this.MAX_LOG_BODY_LENGTH) {
        str = str.substring(0, this.MAX_LOG_BODY_LENGTH) + '... [truncated]'
      }
      return str
    } catch (e) {
      this.logger.error(e)
      return '[Unserializable body]'
    }
  }
}
