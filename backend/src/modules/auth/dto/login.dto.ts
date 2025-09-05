import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDto {
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
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string
}
