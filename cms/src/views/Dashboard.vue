<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.logoutAction()
  await router.push('/login')
}
</script>

<template>
  <Card>
    <template #title>Панель управления</template>
    <template #content>
      <p>Добро пожаловать в вашу CMS!</p>
      <Button label="Выйти" class="mt-4" @click="logout" />
    </template>
  </Card>
</template>
