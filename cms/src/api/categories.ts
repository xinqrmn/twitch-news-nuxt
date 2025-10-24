import { api } from '@/utils/requestHandler'

const API_URL = 'http://localhost:9000/api/badges'

export interface CategoryDto {
  name: string
}

export async function getCategories() {
  return api.get(`${API_URL}/get`)
}

export async function createCategory(data: CategoryDto) {
  return api.post(`${API_URL}/create`, data)
}

export async function updateCategory(id: number | string, data: CategoryDto) {
  return api.patch(`${API_URL}/update/${id}`, data)
}

export async function deleteCategory(id: number | string) {
  return api.delete(`${API_URL}/delete/${id}`)
}
