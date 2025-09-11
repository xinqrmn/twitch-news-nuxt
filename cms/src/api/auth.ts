import { api } from '@/utils/requestHandler'

const API_URL = 'http://localhost:9000/api/auth'

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  roles?: string[]
}

export async function login(data: LoginDto) {
  return api.post(`${API_URL}/login`, data)
}

export async function register(data: RegisterDto) {
  return api.post(`${API_URL}/register`, data)
}

export async function logout() {
  return api.post(`${API_URL}/logout`)
}

export async function getMe() {
  return api.get(`${API_URL}/me`)
}
