import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common'
import { Respond } from 'src/common/response/response'
import { ParserService } from './parser.service'
import { Roles } from 'src/common/decorators/roles.decorator'
import { JWTGuard } from '../auth/guards/jwt.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@ApiTags('Parser')
@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('force')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTGuard, RolesGuard)
  @Roles(['admin'])
  @ApiOperation({
    summary: 'Принудительный запуск парсера',
    description:
      'Принудительный запуск парсера. Только пользователь с ролью `admin` может принудительно запускать парсинг',
  })
  @ApiResponse({ status: 200, description: 'Парсинг успешен' })
  @ApiResponse({ status: 401, description: 'Пользователь, осуществивший запрос, не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async forceStartParser(@Req() req: Request & { user: { username: string } }) {
    await this.parserService.parseStreamers(req.user.username)
    return Respond.ok()
  }
}
