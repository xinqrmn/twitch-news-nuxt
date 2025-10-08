import { PartialType } from '@nestjs/swagger';
import { CreateStreamerDto } from './create-streamer.dto';

export class UpdateStreamerDto extends PartialType(CreateStreamerDto) {}
