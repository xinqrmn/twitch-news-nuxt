import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateStreamerDto {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  displayName: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  languages?: string[]
}
