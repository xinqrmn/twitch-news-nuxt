import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUsers, createUser, updateUser, deleteUser } from '@/api/users'
import type { User, CreateUserDto, UpdateUserDto } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  const list = ref<User[]>([])
  const loading = ref(false)

  const fetchUsers = async () => {
    loading.value = true
    try {
      const res = await getUsers()
      list.value = res.data?.data
    } catch (err) {
      console.error('Ошибка получения списка пользователй: ', err)
    } finally {
      loading.value = false
    }
  }

  const createUserAction = async (data: CreateUserDto) => {
    const res = await createUser(data)
    if (res.data.success) await fetchUsers()
    // list.value.push(res.data)
  }

  const updateUserAction = async (id: number, data: UpdateUserDto) => {
    const res = await updateUser(id, data)
    if (res.data.success) await fetchUsers()
    // const index = list.value.findIndex((u) => u.id === id)
    // if (index !== -1) {
    //   list.value[index] = res.data
    // }
  }

  const deleteUserAction = async (id: number) => {
    const res = await deleteUser(id)
    if (res.data.success) await fetchUsers()
    // list.value.filter((u) => u.id !== id)
  }

  return {
    list,
    loading,
    fetchUsers,
    createUserAction,
    updateUserAction,
    deleteUserAction,
  }
})
