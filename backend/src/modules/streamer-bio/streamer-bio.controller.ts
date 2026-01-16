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
  HttpException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Respond } from 'src/common/response/response'
import { StreamerBioService } from './streamer-bio.service'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { CreateStreamerBioDto } from './dto/create-streamer-bio.dto'
import { UpdateStreamerBioDto } from './dto/update-streamer-bio.dto'
import { Roles } from 'src/common/decorators/roles.decorator'
import { JWTGuard } from '../auth/guards/jwt.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@ApiTags('StreamerBio')
@UseGuards(JWTGuard, RolesGuard)
@Controller('streamer-bio')
export class StreamerBioController {
  constructor(private readonly bioService: StreamerBioService) {}

  @Post('/create')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'streamer_bio_editor', 'streamer_bio_author'])
  @ApiOperation({
    summary: 'Создать биографию стримера',
    description:
      'Создание новой биографии стримера. Требуется роль `Администратор`, `Редактор карточек стримера` или `Автор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Биография стримера успешно создана' })
  @ApiResponse({ status: 409, description: 'Биография с таким именем уже существует' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async create(@Body() dto: CreateStreamerBioDto) {
    await this.bioService.create(dto)
    return Respond.ok()
  }

  @Get('/get')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'streamer_bio_editor', 'streamer_bio_author'])
  @ApiOperation({
    summary: 'Получить все биографии стримеров',
    description:
      'Получение списка всех биографий стримеров с пагинацией. Требуется роль `Администратор`, `Редактор карточек стримера` или `Автор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async getAllBioList(@Paginate() query: PaginateQuery) {
    const { data, meta } = await this.bioService.getAllBioList(query)
    return Respond.many(data, meta)
  }

  @Get(':displayName')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'streamer_bio_editor', 'streamer_bio_author'])
  @ApiOperation({
    summary: 'Получить биографию по displayName',
    description:
      'Получение биографии конкретного стримера по display Name. Требуется роль `Администратор`, `Редактор карточек стримера` или `Автор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Биография найдена' })
  @ApiResponse({ status: 404, description: 'Биография не найдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async getOneByDisplayName(@Param('displayName') dName: string) {
    const bio = await this.bioService.findOneByDisplayName(dName)
    if (!bio) {
      throw new HttpException('Биография не найдена', HttpStatus.NOT_FOUND)
    }
    return Respond.one(bio)
  }

  @Patch('/edit/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'streamer_bio_editor'])
  @ApiOperation({
    summary: 'Обновить биографию стримера',
    description:
      'Обновление биографии стримера по ID. Требуется роль `Администратор` или `Редактор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Биография обновлена' })
  @ApiResponse({ status: 404, description: 'Биография не найдена' })
  @ApiResponse({ status: 409, description: 'Биография с таким именем уже существует' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async update(@Param('id') id: number, @Body() dto: UpdateStreamerBioDto) {
    await this.bioService.update(+id, dto)
    return Respond.ok()
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(['admin', 'streamer_bio_editor'])
  @ApiOperation({
    summary: 'Удалить биографию по ID',
    description:
      'Мягкое удаление биографии стримера по ID. Требуется роль `Администратор` или `Редактор карточек стримера`',
  })
  @ApiResponse({ status: 200, description: 'Биография удалена' })
  @ApiResponse({ status: 404, description: 'Биография не найдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async remove(@Param('id') id: number) {
    await this.bioService.softDelete(+id)
    return Respond.ok()
  }
}
