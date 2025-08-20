export interface IStreamerStats {
  followers: number
  avgViewers: number
  maxViewers: number
  streamedHours: number
}

export interface IStreamerBio {
  article: string
  description: string
  country: string
  language: string
  mainCategory: string
  createdAt: string
  accountAge: string
}

export interface IStreamerMedia {
  type: string
  url: string
  title: string
}

export interface IStreamerNews {
  id: number
  title: string
  date: string
}

export interface IStreamerRelated {
  name: string
  logo: string
  displayName: string
}

export interface IStreamer {
  name: string
  displayName: string
  avatar: string
  isLive: boolean
  createdAt: string
  accountAge: string
  language: string
  followersOnSite: number
  stats?: IStreamerStats
  bio?: IStreamerBio
  media?: IStreamerMedia[]
  news?: IStreamerNews[]
  related?: IStreamerRelated[]
}