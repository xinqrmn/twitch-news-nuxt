export interface Article {
  title: string
  subtitle?: string
  coverImage: string
  createdAt: string
  author: string
  badges: Array<{ type: string; text: string }>
  blocks: ArticleBlock[]
  tags: string[]
}

export interface ArticleBlock {
  type: 'h2' | 'h3' | 'p' | 'img' | 'blockquote' | 'a' | 'separator'
  content: string
  alt?: string
  caption?: string
  cite?: string
  href?: string
}

export interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  createdAt: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}
