import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '../utils/requestHandler'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  type Me = { email?: string; roles?: string[]; username?: string }

  const me = ref<Me | null>(null)
  const status = ref<'unknown' | 'authenticated' | 'unauthenticated'>('unknown')

  const isAuthenticated = computed(() => status.value === 'authenticated')

  async function ensureAuthChecked(force = false): Promise<boolean> {
    if (!force && status.value !== 'unknown') return isAuthenticated.value
    const { data } = await api.get<{ success: boolean; data?: Me }>('/auth/me')
    if (data?.success && data.data) {
      me.value = data.data
      status.value = 'authenticated'
      return true
    }
    status.value = 'unauthenticated'
    me.value = null
    return false
  }

  async function login(username: string, password: string): Promise<boolean> {
    const { data, error } = await api.post<any>('/auth/login', {
      email: username.toString(),
      password,
    })
    if (error) {
      return false
    }
    if (data?.success) {
      await ensureAuthChecked(true)
      return true
    }
    return false
  }

  async function logout() {
    const { data } = await api.post<any>('/auth/logout')
    if (data?.success) {
      status.value = 'unauthenticated'
      me.value = null
    }
    router.push('/login')
  }

  return { me, status, isAuthenticated, ensureAuthChecked, login, logout }
})
