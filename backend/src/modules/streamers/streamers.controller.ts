import { Body, Controller, Delete, Get, Param, Patch, Post, Req, HttpCode, HttpStatus } from '@nestjs/common'
import { StreamersService } from './streamers.service'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Streamer } from './streamer.entity'
import {
  Paginate,
  PaginatedMetaDocumented,
  PaginatedSwaggerDocs,
  PaginateQuery,
} from 'nestjs-paginate'
import { Respond } from 'src/common/response/response'
import { StreamerBio } from '../streamer-bio/streamer-bio.entity'

@ApiTags('Streamers')
@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Get('/get')
  @ApiOperation({ summary: 'Получить всех стримеров' })
  async getAllStreamers(@Paginate() query: PaginateQuery) {
    const { data, meta } = await this.streamersService.getAllStreamers(query)

    return Respond.many(data, meta)
  }

  @Get(':displayName')
  @ApiOperation({ summary: 'Получить стримера по displayName' })
  async findOne(@Param('displayName') dName: string) {
    return Respond.one(await this.streamersService.getOneByDisplayName(dName))
  }
}
