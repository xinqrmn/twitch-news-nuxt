export interface IStreamerVideo {
  imageUrl: string
  category: string
  title: string
  duration: number
  watches: number
  date: Date
}

export interface IStreamerVideos {
  displayName: string
  videos: IStreamerVideo[]
}