import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref<boolean>(localStorage.getItem('isAuth') === 'true')

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === '1234') {
      isAuthenticated.value = true
      localStorage.setItem('isAuth', 'true')
      return true
    }
    return false
  }

  const logout = (): void => {
    isAuthenticated.value = false
    localStorage.setItem('isAuth', 'false')
  }

  return {
    isAuthenticated,
    login,
    logout,
  }
})
