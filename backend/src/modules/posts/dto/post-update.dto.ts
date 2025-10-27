import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator'

export class PostUpdateDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Заголовок новости',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Подзаголовок новости',
    required: false,
  })
  @IsOptional()
  @IsString()
  subtitle?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Мета тег описания новости',
    required: false,
  })
  @IsOptional()
  @IsString()
  metaDescription?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Open Graph мета тег описания новости',
    required: false,
  })
  @IsOptional()
  @IsString()
  metaOgDescription?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Open Graph мета тег заголовка',
    required: false,
  })
  @IsOptional()
  @IsString()
  metaOgTitle?: string

  @ApiPropertyOptional({
    type: String,
    description: 'URL изображения новости',
    required: false,
    maxLength: 2048,
    example:
      'https://static.vecteezy.com/system/resources/previews/034/925/406/non_2x/ai-generated-shorthair-cat-on-transparent-background-image-png.png',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  @IsUrl()
  coverImageUrl?: string

  @ApiPropertyOptional({
    type: String,
    description: 'Контент новости в markdown',
    required: false,
    example: `**Blockquotes:**
    Use the greater-than symbol[5].
    > This is a quote.
    > It can span multiple lines.`,
  })
  @IsOptional()
  @IsString()
  content?: string

  @ApiPropertyOptional({
    type: [Number],
    description: 'Массив идентификаторов тегов',
    required: false,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[]

  @ApiPropertyOptional({
    type: [Number],
    description: 'Массив идентификаторов бейджей',
    required: false,
    example: [4, 5],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  badges?: number[]

  @ApiPropertyOptional({
    type: String,
    description: 'Дата и время публикации (ISO-8601). Если в прошлом или пусто — публикуем сразу',
    required: false,
    example: '2025-10-27T14:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  publishAt?: string
}


