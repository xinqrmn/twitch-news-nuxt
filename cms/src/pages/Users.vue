<template>
  <div class="space-y-6">
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
              <InputText
                v-model="email"
                class="w-full"
                inputId="email"
                variant="outlined"
                type="email"
              />
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
            <Button type="submit" prevent label="Создать пользователя" class="w-full" />
          </form>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>
        <h3>Список пользователей</h3>
      </template>
      <template #content>
        <DataTable :value="users" tableStyle="min-width: 50rem">
          <Column field="id" header="ID"></Column>
          <Column field="username" header="Имя пользователя"></Column>
          <Column field="email" header="E-mail"></Column>
          <Column field="roles" header="Роли">
            <template #body="slotProps">
              <Tag
                v-for="role in slotProps.data.roles"
                :value="role"
                :severity="getRoleTag(role)"
                :key="role.name"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { ref, onMounted } from 'vue'
import { api } from '../utils/requestHandler'
import type { User } from 'src/types/user'

const username = ref('')
const password = ref('')
const email = ref('')

const users = ref<User[]>([])
// const router = useRouter()
const toast = useToast()

const handleCreate = async () => {
  const { data, error } = await api.post<any>('/users/createWithRoles', {
    email: email.value.toString(),
    password: password.value,
    username: username.value,
    roles: ['user', 'admin'],
  })
  if (data) {
    toast.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Пользователь успешно создан!',
      life: 3000,
    })
    // Clear form after successful creation
    username.value = ''
    email.value = ''
    password.value = ''
    // Refresh users list
    const { data: usersData } = await api.get<any>('/users/get')
    if (usersData) {
      users.value = usersData.data
    }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error?.message || 'Ошибка при создании пользователя!',
      life: 3000,
    })
  }
}

const getRoleTag = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'danger'
    case 'user':
      return 'success'
    default:
      return null
  }
}

onMounted(async () => {
  const { data, error } = await api.get<any>('/users/get')

  if (data) {
    users.value = data.data
  }
  if (error) {
    console.log(error)
  }
})
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
