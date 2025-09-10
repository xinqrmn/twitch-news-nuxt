import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '../utils/requestHandler'
import router from '../router'
import type { User } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  type Me = { email?: string; roles?: string[]; username?: string }

  const me = ref<Me | null>(null)
  const status = ref<'unknown' | 'authenticated' | 'unauthenticated'>('unknown')

  const isAuthenticated = computed(() => status.value === 'authenticated')

  const ensureAuthChecked = async (force = false): Promise<boolean> => {
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

  const login = async (username: string, password: string): Promise<boolean> => {
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

  const logout = async () => {
    const { data } = await api.post<any>('/auth/logout')
    if (data?.success) {
      status.value = 'unauthenticated'
      me.value = null
    }
    router.push('/login')
  }

  const handleCreate = async () => {
    const { data, error } = await api.post<any>('/users/createWithRoles', {
      email: email.value.toString(),
      password: password.value,
      username: username.value,
      roles: ['user'],
    })
    if (data) {
      toast.add({
        severity: 'success',
        summary: 'Успешно!',
        detail: 'Пользователь успешно создан!',
        life: 3000,
      })
      username.value = ''
      email.value = ''
      password.value = ''
      await getItems()
    } else {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error?.message || 'Ошибка при создании пользователя!',
        life: 3000,
      })
    }
  }

  const handleEdit = async (userData: Partial<User>) => {
    const { data, error } = await api.patch<any>(`/users/update/${userData.id}`, {
      email: editInfo.value.email.toString(),
      password: editInfo.value.password,
      image_url: editInfo.value.image_url,
      roles: ['user'],
    })
    if (data) {
      toast.add({
        severity: 'success',
        summary: 'Успешно!',
        detail: 'Пользователь успешно изменен!',
        life: 3000,
      })
      editInfo.value = undefined
      editVisible.value = false
      await getItems()
    } else {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error?.message || 'Ошибка при редактировании пользователя!',
        life: 3000,
      })
    }
  }

  const handleDelete = async (userData: User) => {
    const { data, error } = await api.delete<any>(`/users/delete/${userData.id}`)

    if (data) {
      toast.add({
        severity: 'success',
        summary: 'Успешно!',
        detail: `Пользователь ${userData.username} помечен как удаленный`,
        life: 3000,
      })
      await getItems()
    }

    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Произошла ошибка при удалении пользователя!',
        life: 3000,
      })
    }
  }
  return { me, status, isAuthenticated, ensureAuthChecked, login, logout, handleCreate, handleEdit, handleDelete }
})
