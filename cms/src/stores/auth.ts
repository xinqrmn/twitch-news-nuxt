import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../utils/requestHandler'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(document.cookie.indexOf('access_token') !== -1)

  async function login(username: string, password: string): Promise<boolean> {
    const { data, error } = await api.post<any>('/auth/login', {
      email: username.toString(),
      password,
    })
    if (error) {
      return false
    }
    if (data?.success) {
      isAuthenticated.value = true
      return true
    }
    return false
  }

  async function logout() {
    const { data, error } = await api.post<any>('/auth/logout')
    if (data?.success) {
      isAuthenticated.value = false
    }
  }

  return { isAuthenticated, login, logout }
})
