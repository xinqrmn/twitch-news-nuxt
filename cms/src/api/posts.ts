import { api } from '@/utils/requestHandler'
import type { PaginationParams } from '@/utils/requestHandler'

const API_URL = 'http://localhost:9000/api/posts'

export interface User {
  id: number
  email: string
  roles: string[]
}

export interface CreateUserDto {
  email: string
  password: string
  roles: string[]
}

export interface UpdateUserDto {
  email?: string
  password?: string
  roles?: string[]
}

export async function getPosts(pagination?: PaginationParams) {
  return api.get<any>(`${API_URL}/get`, pagination)
}

export async function getPostsById(id: string, pagination?: PaginationParams) {
  return api.get<any>(`${API_URL}/get/${id}`, pagination)
}

// export async function createUser(data: CreateUserDto) {
//   return api.post<User>(`${API_URL}/createWithRoles`, data)
// }

// export async function updateUser(id: number, data: UpdateUserDto) {
//   return api.patch<User>(`${API_URL}/update/${id}`, data)
// }

// export async function deleteUser(id: number) {
//   return api.delete(`${API_URL}/delete/${id}`)
// }
