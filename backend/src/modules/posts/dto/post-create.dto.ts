import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator'

export class PostCreateDto {

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Заголовок новости',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Подзаголовок новости',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  subtitle: string

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Мета тег описания новости',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  metaDescription: string

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Open Graph мета тег описания новости',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  metaOgDescription: string

  @ApiProperty({
    type: String,
    description: 'Open Graph мета тег заголовка',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  metaOgTitle: string

  @ApiProperty({
    type: String,
    required: false,
    description: 'URL изображения новости',
    maxLength: 2048,
    example:
      'https://static.vecteezy.com/system/resources/previews/034/925/406/non_2x/ai-generated-shorthair-cat-on-transparent-background-image-png.png',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  @IsUrl()
  coverImageUrl: string

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    description: 'Контент новости в markdown',
    example: `**Blockquotes:**
    Use the greater-than symbol[5].
    > This is a quote.
    > It can span multiple lines.`,
  })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({
    type: [Number],
    required: true,
    description: 'Массив идентификаторов тегов',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsInt({ each: true })
  tags: number[]

  @ApiProperty({
    type: [Number],
    required: true,
    description: 'Массив идентификаторов бейджей',
    example: [4, 5],
  })
  @IsArray()
  @IsInt({ each: true })
  badges: number[]
}
