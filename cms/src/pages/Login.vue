<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLayout } from '@/layout/composables/layout.ts'
import { useToast } from 'primevue/usetoast'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const handleLogin = () => {
  if (authStore.login(username.value, password.value)) {
    toast.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Авторизация успешна!',
      life: 3000,
    })
    router.push('/dashboard')
  } else {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Неверный логин или пароль!',
      life: 3000,
    })
  }
}

const { isDarkTheme, toggleDarkMode } = useLayout()
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-950 flex justify-center items-center min-h-screen">
    <Card class="w-96">
      <template #title>
        <div class="flex items-center justify-between mb-4">
          <h3>Вход в систему</h3>
          <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
            <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
          </button>
        </div>
      </template>
      <template #content>
        <div class="p-fluid">
          <form @submit.prevent="handleLogin">
            <FloatLabel variant="on" class="mb-8">
              <InputText v-model="username" class="w-full" id="username" />
              <label for="username">Логин</label>
            </FloatLabel>
            <FloatLabel variant="on" class="mb-8 w-full login-input">
              <Password v-model="password" toggleMask :feedback="false" id="password" />
              <label for="password">Пароль</label>
            </FloatLabel>
            <Button type="submit" prevent label="Войти" class="w-full" />
          </form>
        </div>
      </template>
    </Card>
  </div>
</template>

<style lang="scss">
.login-input {
  .p-password,
  .p-password-input {
    width: 100%;
  }
}
</style>
