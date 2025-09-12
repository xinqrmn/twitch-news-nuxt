export type User = {
  id: number
  email: string
  username: string
  roles: string[]
  image_url?: string
  created_at?: string
  updated_at?: string
}

export interface CreateUserDto {
  email: string
  password: string
  roles: string[]
}

export interface UpdateUserDto {
  id?: number
  email?: string
  password?: string
  image_url?: string
}
