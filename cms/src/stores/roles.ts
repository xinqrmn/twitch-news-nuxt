import { ref } from 'vue'
import { getRoles, type Role } from '../api/roles'
import { defineStore } from 'pinia'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref<Role[]>([])
  const loading = ref(false)

  const fetchRoles = async () => {
    if (!roles.value.length) {
      loading.value = true
      try {
        const res = await getRoles()
        roles.value = res.data?.data
      } catch (e) {
        console.log('Ошибка получения списка ролей: ', e)
      } finally {
        loading.value = false
      }
    }
  }

  return {
    roles,
    loading,
    fetchRoles,
  }
})
