import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class StorageDeleteDto {

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Ключ файла',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  key: string
}
