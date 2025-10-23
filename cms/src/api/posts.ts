import { api } from '@/utils/requestHandler'
import type { PaginationParams } from '@/utils/requestHandler'

const API_URL = 'http://localhost:9000/api/posts'

export interface User {
  id: number
  email: string
  roles: string[]
}

export interface CreatePostDto {
  title: string
  subtitle: string
  metaDescription: string
  metaOgDescription: string
  metaOgTitle: string
  coverImageUrl: string
  content: string
  tags?: number[]
  badges?: number[]
}

export async function getPosts(pagination?: PaginationParams) {
  return api.get(`${API_URL}/get`, pagination)
}

export async function getPostById(id: number, pagination?: PaginationParams) {
  return api.get(`${API_URL}/get/${id}`, pagination)
}

export async function updatePost(id: number, data: CreatePostDto) {
  return api.patch(`${API_URL}/update/${id}`, data)
}

export async function deletePostById(id: number) {
  return api.delete(`${API_URL}/delete/${id}`)
}

export async function createPost(data: CreatePostDto) {
  return api.post(`${API_URL}/create`, data)
}
