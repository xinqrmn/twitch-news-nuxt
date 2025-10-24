import { api } from '@/utils/requestHandler'

const API_URL = 'http://localhost:9000/api/tags'

export interface TagsDto {
  name: string
}

export async function getTags() {
  return api.get(`${API_URL}/get`)
}

export async function createTag(data: TagsDto) {
  return api.post(`${API_URL}/create`, data)
}

export async function updateTag(id: number | string, data: TagsDto) {
  return api.patch(`${API_URL}/update/${id}`, data)
}

export async function deleteTag(id: number) {
  return api.delete(`${API_URL}/delete/${id}`)
}
