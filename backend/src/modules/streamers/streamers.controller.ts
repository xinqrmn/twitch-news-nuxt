import { Body, Controller, Delete, Get, Param, Patch, Post, Req, HttpCode, HttpStatus } from '@nestjs/common'
import { StreamersService } from './streamers.service'
import { CreateStreamerDto } from './dto/create-streamer.dto'
import { UpdateStreamerDto } from './dto/update-streamer.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Streamer } from './streamer.entity'

@ApiTags('streamers')
@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Создать стримера' })
  @ApiResponse({ status: 201, type: Streamer })
  create(@Body() dto: CreateStreamerDto, @Req() req: any) {
    return this.streamersService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Получить всех стримеров' })
  @ApiResponse({ status: 200, type: [Streamer] })
  findAll() {
    return this.streamersService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить стримера по ID' })
  @ApiResponse({ status: 200, type: Streamer })
  findOne(@Param('id') id: string) {
    return this.streamersService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные стримера' })
  @ApiResponse({ status: 200, type: Streamer })
  update(@Param('id') id: string, @Body() dto: UpdateStreamerDto) {
    return this.streamersService.update(+id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить стримера' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.streamersService.remove(+id)
  }

  @Post('seed')
  @ApiOperation({ summary: 'Заполнить таблицу стримеров тестовыми данными' })
  async seed() {
    return this.streamersService.seed()
  }
}
