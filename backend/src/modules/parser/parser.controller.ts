import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
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
  @ApiOperation({
    summary: 'Принудительный запуск парсера',
    description:
      'Принудительный запуск парсера.`',
  })
  @ApiResponse({ status: 200, description: 'Комментарии получены' })
  async forceStartParser() {
    await this.parserService.parseStreamers()
    return Respond.ok()
  }
}
