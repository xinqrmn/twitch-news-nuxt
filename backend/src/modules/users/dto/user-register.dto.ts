import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator'

export class userRegisterDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 3,
    maxLength: 64,
    format: 'email',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username: string

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    minLength: 4,
  })
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
}
