import { PartialType } from '@nestjs/mapped-types';
import { CreateStreamerBioDto } from './create-streamer-bio.dto';

export class UpdateStreamerBioDto extends PartialType(CreateStreamerBioDto) {}