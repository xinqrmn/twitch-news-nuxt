<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <Card class="">
    <template #title>Панель управления</template>
    <template #content>
      <p>Добро пожаловать в вашу CMS!</p>
      <Button label="Выйти" class="mt-4" @click="logout" />
    </template>
  </Card>
</template>
