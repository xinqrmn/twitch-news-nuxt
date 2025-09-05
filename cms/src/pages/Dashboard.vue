<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <Card>
      <template #title>Панель управления</template>
      <template #content>
        <p>Добро пожаловать в вашу CMS!</p>
        <Button label="Выйти" class="mt-4" @click="logout" />
      </template>
    </Card>
  </div>
</template>
