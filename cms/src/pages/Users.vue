<template>
  <div class="space-y-6 h-full">
    <Button label="Add User" icon="pi pi-plus" @click="showForm = true" />
    <UsersForm v-if="showForm" @submit="handleCreate" @close="showForm = false" />
    <UsersTable
      @showDialog="
        (data) => {
          editData = data
          showDialog = true
        }
      "
      @userDelete="handleDelete"
    ></UsersTable>
    <UsersDialog v-model:visible="showDialog" :userData="editData" @handleEdit="(data) => handleEdit(data.id, data)" />
  </div>
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

const handleEdit = (id: number, userData) => {
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
