import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Respond } from 'src/common/response/response'
import { StreamerBioService } from './streamer-bio.service'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { CreateStreamerBioDto } from './dto/create-streamer-bio.dto'

@ApiTags('Streamer Bio')
@Controller('streamer-bio')
export class StreamerBioController {
  constructor(private readonly bioService: StreamerBioService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Создать биографию стримера',
    description: 'Создание биографии для стримера по его id',
  })
  @ApiResponse({ status: 200, description: 'Биография стримера успешно создана' })
  @ApiResponse({ status: 403, description: 'Биография для данного стримера уже существует' })
  async create(@Body() dto: CreateStreamerBioDto) {
    await this.bioService.create(+id, dto)
    return Respond.ok()
  }

  @Get('get')
  @UseGuards(StreamerBioController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получить все биографии стримеров',
    description:
      'Требуется авторизация. Только пользователи с ролью streamer_bio_editor или streamer_bio_author могут получить список биографии для всех стримеров',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 200, description: 'Недостаточно прав для получения данных' })
  getAllBioList(
    @Paginate() query: PaginateQuery,
    @Req() req: Request & { user?: { roles?: string[] } }
  ) {
    const roles: string[] = req.user?.roles ?? []
    if (!roles.includes('admin' || 'streamer_bio_editor' || 'streamer_bio_author')) {
      throw new HttpException('Недостаточно прав', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const { data, meta } = await this.bioService.getAllBioList()
    return Respond.many(data, meta)
  }

  @Patch('update/:id')
    @UseGuards(StreamerBioController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновить био стримера' })
  @ApiResponse({ status: 200, description: 'Updated' })
  update(@Param('id') id: number, @Body() dto: CreateStreamerBioDto) {
    return this.bioService.update(+id, dto)
  }

  @ApiOperation({ summary: 'Создать био стримера' })
  @ApiResponse({ status: 201, description: 'Created' })
  @Post(':id')
  create(@Param('id') id: number, @Body() dto: CreateStreamerBioDto) {
    return this.bioService.create(+id, dto)
  }

  @ApiOperation({ summary: 'Удалить био по ID' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bioService.delete(+id)
  }
}
