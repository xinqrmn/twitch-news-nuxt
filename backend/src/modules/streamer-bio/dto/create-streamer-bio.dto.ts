import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsInt, IsDateString, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class SocialDto {
  @ApiProperty({ example: 'twitch' })
  @IsString()
  type: string

  @ApiProperty({ example: 'https://twitch.tv/streamer' })
  @IsString()
  url: string
}

export class CreateStreamerBioDto {
  @ApiProperty({ example: 'xinqrmn' })
  @IsString()
  displayName: string

  @ApiProperty({ example: 'xinqrmn' })
  @IsString()
  byname: string

  @ApiProperty({ example: '1999-04-12', required: false })
  @IsOptional()
  @IsDateString()
  birthday?: string

  @ApiProperty({ example: 'CS:GO', required: false })
  @IsOptional()
  @IsString()
  mainGame?: string

  @ApiProperty({ example: 75, required: false })
  @IsOptional()
  @IsInt()
  weight?: number

  @ApiProperty({ example: 'Россия', required: false })
  @IsOptional()
  @IsString()
  country?: string

  @ApiProperty({ example: 'Москва', required: false })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({ example: 182, required: false })
  @IsOptional()
  @IsInt()
  height?: number

  @ApiProperty({ example: 'Известный стример...', required: false })
  @IsOptional()
  @IsString()
  bio?: string

  @ApiProperty({ example: ['https://example.com/img1.jpg'], required: false })
  @IsOptional()
  @IsArray()
  gallery?: string[]

  @ApiProperty({ type: [SocialDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SocialDto)
  socials?: SocialDto[]
}
