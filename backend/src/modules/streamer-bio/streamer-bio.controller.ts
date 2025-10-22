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
  HttpException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Respond } from 'src/common/response/response'
import { StreamerBioService } from './streamer-bio.service'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { CreateStreamerBioDto } from './dto/create-streamer-bio.dto'
import { UpdateStreamerBioDto } from './dto/update-streamer-bio.dto'

@ApiTags('StreamerBio')
@Controller('streamer-bio')
export class StreamerBioController {
  constructor(private readonly bioService: StreamerBioService) {}

  private static JwtAuthGuard = class extends AuthGuard('jwt') {}

  @Post('/create')
  @UseGuards(StreamerBioController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Создать биографию стримера',
    description: 'Создание новой биографии стримера',
  })
  @ApiResponse({ status: 200, description: 'Биография стримера успешно создана' })
  @ApiResponse({ status: 409, description: 'Биография с таким именем уже существует' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  async create(@Body() dto: CreateStreamerBioDto) {
    await this.bioService.create(dto)
    return Respond.ok()
  }

  @Get('/get')
  @UseGuards(StreamerBioController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получить все биографии стримеров',
    description: 'Получение списка всех биографий стримеров с пагинацией',
  })
  @ApiResponse({ status: 200, description: 'Список получен' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  async getAllBioList(@Paginate() query: PaginateQuery) {
    const { data, meta } = await this.bioService.getAllBioList(query)
    return Respond.many(data, meta)
  }

  @Get(':displayName')
  @UseGuards(StreamerBioController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получить биографию по displayName',
    description: 'Получение биографии конкретного стримера по display Name',
  })
  @ApiResponse({ status: 200, description: 'Биография найдена' })
  @ApiResponse({ status: 404, description: 'Биография не найдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  async getOneByDisplayName(@Param('displayName') dName: string) {
    const bio = await this.bioService.findOneByDisplayName(dName)
    if (!bio) {
      throw new HttpException('Биография не найдена', HttpStatus.NOT_FOUND)
    }
    return Respond.one(bio)
  }

  @Patch('/edit/:id')
  @UseGuards(StreamerBioController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Обновить биографию стримера',
    description: 'Обновление биографии стримера по ID',
  })
  @ApiResponse({ status: 200, description: 'Биография обновлена' })
  @ApiResponse({ status: 404, description: 'Биография не найдена' })
  @ApiResponse({ status: 409, description: 'Биография с таким именем уже существует' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  async update(@Param('id') id: number, @Body() dto: UpdateStreamerBioDto) {
    await this.bioService.update(+id, dto)
    return Respond.ok()
  }

  @Delete(':id')
  @UseGuards(StreamerBioController.JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Удалить биографию по ID',
    description: 'Мягкое удаление биографии стримера по ID',
  })
  @ApiResponse({ status: 200, description: 'Биография удалена' })
  @ApiResponse({ status: 404, description: 'Биография не найдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  async remove(@Param('id') id: number) {
    await this.bioService.softDelete(+id)
    return Respond.ok()
  }
}
