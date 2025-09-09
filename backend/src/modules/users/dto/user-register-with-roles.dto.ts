import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ArrayNotEmpty,
  ArrayUnique,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator'

export class userRegisterWithRolesDto {
  @ApiProperty({ type: String, required: true, format: 'email' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({ type: String, required: true, minLength: 3 })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username: string

  @ApiProperty({ type: String, required: true, minLength: 4 })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string

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

  @ApiProperty({ type: [String], required: true, description: 'Список ролей (имена ролей)' })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  roles: string[]
}


