<template>
  <Card class="space-y-6 h-full">
    <template #title>
      <div class="flex items-center justify-between">
        <h2>Список пользователей</h2>
        <Button label="Добавить пользователя" variant="text" icon="pi pi-plus" @click="showForm = true" />
      </div>
    </template>
    <template #content>
      <UsersForm v-if="showForm" @submit="handleCreate" v-model="showForm" />
      <UsersTable
        @showDialog="
          (data) => {
            editData = data
            showDialog = true
          }
        "
        @userDelete="handleDelete"
      />
    </template>
  </Card>
  <UsersDialog
    v-model:visible="showDialog"
    :userData="editData"
    @handleEdit="(data) => handleEdit(data.id, data)"
    @close="showDialog = false"
  />
</template>

<script setup lang="ts">
import UsersTable from '@/components/Users/UsersTable.vue'
import UsersForm from '@/components/Users/UsersForm.vue'
import UsersDialog from '@/components/Users/UsersDialog.vue'
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import type { UpdateUserDto } from '@/types/user'

const usersStore = useUsersStore()
const showForm = ref(false)
const showDialog = ref(false)
const editData = ref<UpdateUserDto | null>(null)

const handleEdit = (id: number, userData: UpdateUserDto) => {
  usersStore.updateUserAction(id, userData)
  showDialog.value = false
}

const handleDelete = (id: number) => {
  usersStore.deleteUserAction(id)
}

const handleCreate = (userData) => {
  usersStore.createUserAction(userData)
  showForm.value = false
}
</script>

<style scoped></style>
