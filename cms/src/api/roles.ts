import { api } from '@/utils/requestHandler'

const API_URL = 'http://localhost:9000/api/roles'

export interface Role {
  id: number
  name: string
}

export async function getRoles() {
	return api.get<Role[]>(`${API_URL}/get`)
}