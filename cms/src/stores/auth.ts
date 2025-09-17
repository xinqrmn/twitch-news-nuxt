import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { login, logout, getMe } from '@/api/auth'
import type { User } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const isAuthenticated = ref(false)
  const isAdmin = computed(() => user.value?.roles.includes('admin') ?? false)
  const isInitialized = ref(false)

  const router = useRouter()

  const initializeAuth = async () => {
    try {
      await fetchMe()
    } catch (error) {
      console.error('Ошибка при восстановлении сессии:', error)
      isAuthenticated.value = false
      user.value = null
    } finally {
      isInitialized.value = true
    }
  }



  const loginAction = async (email: string, password: string) => {
    const res = await login({ email, password })
    if (res.data && res.data.success) {
      await fetchMe()
      if (isAuthenticated.value) {
        await router.push('/')
      }
      return true
    } else return false
  }

  const logoutAction = async () => {
    await logout()
    isAuthenticated.value = false
    user.value = null
  }

  const fetchMe = async () => {
    loading.value = true
    try {
      const res = await getMe()
      user.value = res.data.data
      isAuthenticated.value = true
    } catch (e) {
      console.error('Ошибка запроса данных пользователя: ', e)
      user.value = null
      isAuthenticated.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    isInitialized,
    isAdmin,
    initializeAuth,
    loginAction,
    logoutAction,
    fetchMe,
  }
})
