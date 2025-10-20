import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Respond } from 'src/common/response/response'
import { ParserService } from './parser.service'

@ApiTags('Parser')
@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

  @Get('force')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ParserController.JwtAuthGuard)
  @ApiOperation({
    summary: 'Принудительный запуск парсера',
    description:
      'Принудительный запуск парсера. Только пользователь с ролью `admin` может принудительно запускать парсинг',
  })
  @ApiResponse({ status: 200, description: 'Парсинг успешен' })
  @ApiResponse({ status: 401, description: 'Пользователь, осуществивший запрос, не авторизован' })
  @ApiResponse({ status: 500, description: 'Недостаточно прав' })
  async forceStartParser(@Req() req: Request & { user?: { roles?: string[] } }) {
    const roles: string[] = req.user?.roles ?? []
    if (!roles.includes('admin')) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    await this.parserService.parseStreamers()
    return Respond.ok()
  }
}
