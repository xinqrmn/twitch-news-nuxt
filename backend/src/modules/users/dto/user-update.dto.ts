import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsUrl,
  MaxLength,
  IsArray,
} from 'class-validator'

export class userUpdateDto {
  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
    minLength: 3,
    maxLength: 64,
    format: 'email',
  })
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
    minLength: 4,
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  password?: string

  @ApiProperty({
    type: String,
    required: false,
    description: 'URL изображения пользователя',
    maxLength: 2048,
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(2048)
  image_url?: string

  @ApiProperty({
    type: [String],
    required: false,
    description: 'Названия ролей для назначения пользователю',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[]
}
