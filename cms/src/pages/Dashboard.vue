<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useRouter } from 'vue-router'
import AppTopbar from '@/layout/AppTopbar.vue'
import AppSidebar from '@/layout/AppSidebar.vue'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-surface-950 min-h-screen">
    <AppTopbar></AppTopbar>
    <AppSidebar></AppSidebar>
    <div class="ml-[22rem] pt-[6rem] pr-8 pl-8">
      <Card class="">
        <template #title>Панель управления</template>
        <template #content>
          <p>Добро пожаловать в вашу CMS!</p>
          <Button label="Выйти" class="mt-4" @click="logout" />
        </template>
      </Card>
    </div>
  </div>
</template>
