import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CommentCreateDto {
  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'ID поста',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  post_id: number

  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'ID автора',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  author_id: number

  @ApiProperty({
    type: Number,
    nullable: true,
    description: 'ID родительского комментария',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  parent_comment_id?: number

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Текст комментария',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string
}
