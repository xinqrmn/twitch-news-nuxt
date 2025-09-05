<template>
  <Card class="w-96">
    <template #title>
      <div class="flex items-center justify-between mb-4">
        <h3>Создание пользователя</h3>
      </div>
    </template>
    <template #content>
      <div class="p-fluid">
        <form @submit.prevent="handleCreate">
          <FloatLabel variant="on" class="mb-8 login-input">
            <InputText v-model="username" class="w-full" inputId="username" variant="outlined" />
            <label class="auth-label" id="loginLabel" for="username">Логин</label>
          </FloatLabel>
          <FloatLabel variant="on" class="mb-8 login-input">
            <InputText v-model="email" class="w-full" inputId="email" variant="outlined" type="email"/>
            <label class="auth-label" id="loginLabel" for="email">Email</label>
          </FloatLabel>
          <FloatLabel variant="on" class="mb-8 w-full login-input">
            <Password
              v-model="password"
              toggleMask
              :feedback="false"
              inputId="password"
              variant="outlined"
            />
            <label class="auth-label" id="loginLabel" for="password">Пароль</label>
          </FloatLabel>
          <Button type="submit" prevent label="Войти" class="w-full" />
        </form>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { api } from '../utils/requestHandler'

const username = ref('')
const password = ref('')
const email = ref('')
// const router = useRouter()
const toast = useToast()

const handleCreate = async () => {
	const { data, error } = await api.post<any>('/users/createWithRoles', {
      email: email.value.toString(),
      password: password.value,
			username: username.value,
			roles: ['user', 'admin']
    })
  if (data) {
    toast.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Пользователь успешно создан!',
      life: 3000,
    })
    // router.push('/dashboard')
  } else {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Неверный логин или пароль!',
      life: 3000,
    })
  }
}
</script>

<style scoped>
.login-input {
  .p-password,
  .p-inputtext,
  .p-password-input {
    width: 100%;
    background-color: transparent;
  }

  & > #loginLabel.auth-label {
    background-color: var(--p-card-background);
  }
}
</style>
