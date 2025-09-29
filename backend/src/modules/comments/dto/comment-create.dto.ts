export class CommentCreateDto {
  post_id: number
  author_id: number
  parent_comment_id?: number
  content: string
}


