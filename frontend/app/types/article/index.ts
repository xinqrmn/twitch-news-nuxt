export interface ArticleBlock {
  type: 'h2' | 'h3' | 'p' | 'img' | 'blockquote' | 'a'
  content: string
  alt?: string
  caption?: string
  cite?: string
  href?: string
}

export interface ArticleBadge {
  type: string
  text: string
}

export interface Article {
  title: string
  createdAt: string
  author?: string
  badges?: ArticleBadge[]
  blocks: ArticleBlock[]
  tags?: string[]
  socialShare?: boolean
}
