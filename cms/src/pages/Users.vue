<template>
  <div class="space-y-6 h-full">
    <Button label="Add User" icon="pi pi-plus" @click="showForm = true" />
    <UsersTable></UsersTable>
    <UsersForm v-if="showForm" @submit="handleCreate" @close="showForm = false" />
  </div>
</template>

<script setup lang="ts">
import UsersTable from '@/components/Users/UsersTable.vue'
import UsersForm from '@/components/Users/UsersForm.vue'
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
const showForm = ref(false)

const handleCreate = (userData) => {
  usersStore.createUser(userData)
  showForm.value = false
}
</script>

<style scoped></style>
