import { api } from '@/utils/requestHandler'
import type { PaginationParams } from '@/utils/requestHandler'

const API_URL = 'http://localhost:9000/api/storage'

export async function getStorageItems(pagination?: PaginationParams) {
  return api.get(`${API_URL}/get`, pagination)
}

// export async function getStorageItems(pagination?: PaginationParams) {
//   return api.get(`${API_URL}/get`, pagination)
// }
