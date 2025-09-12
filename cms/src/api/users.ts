import { api } from '@/utils/requestHandler'

const API_URL = 'http://localhost:9000/api/users'

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

export async function getUsers() {
  return api.get<User[]>(`${API_URL}/get`)
}

export async function createUser(data: CreateUserDto) {
  return api.post<User>(`${API_URL}/createWithRoles`, data)
}

export async function updateUser(id: number, data: UpdateUserDto) {
  return api.patch<User>(`${API_URL}/update/${id}`, data)
}

export async function deleteUser(id: number) {
  return api.delete(`${API_URL}/delete/${id}`)
}
