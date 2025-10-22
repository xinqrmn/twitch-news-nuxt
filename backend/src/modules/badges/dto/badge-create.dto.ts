import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class BadgeCreateDto {
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  name: string
}


