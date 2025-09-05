import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api, setToken } from '../utils/requestHandler'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('access_token'))

  async function login(username: string, password: string): Promise<boolean> {
    const { data, error } = await api.post<any>('/auth/login', {
      email: username.toString(),
      password,
    })
    if (error) {
      return false
    }
    if (data?.success) {
      setToken(data?.data.access_token)
      isAuthenticated.value = true
      return true
    }
    return false
  }

  function logout() {
    setToken(null)
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
})
