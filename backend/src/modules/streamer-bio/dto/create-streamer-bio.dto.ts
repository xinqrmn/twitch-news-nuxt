import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

class SocialDto {
  @IsString()
  type: string;

  @IsUrl({}, { message: 'Некорректная ссылка' })
  url: string;
}

export class CreateStreamerBioDto {
  @IsDateString()
  @IsOptional()
  birthday?: string;

  @IsString()
  @IsOptional()
  mainGame?: string;

  @IsInt()
  @IsOptional()
  weight?: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsInt()
  @IsOptional()
  height?: number;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true, message: 'Каждый элемент gallery должен быть URL' })
  gallery?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialDto)
  @IsOptional()
  socials?: SocialDto[];
}
