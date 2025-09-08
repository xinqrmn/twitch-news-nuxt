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
        <DataTable :value="users" tableStyle="min-width: 50rem" :loading="tableLoading">
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
          <Column class="w-24 !text-end">
            <template #body="{ data }">
              <div class="flex flex-row gap-2">
                <Button
                  icon="pi pi-pencil"
                  v-tooltip.bottom="'Редактировать пользователя'"
                  @click="handleEdit(data)"
                  severity="success"
                ></Button>
                <Button
                  icon="pi pi-user-minus"
                  v-tooltip.bottom="'Удалить пользователя'"
                  @click="requireConfirmation($event, data)"
                  severity="danger"
                ></Button>
                <ConfirmPopup group="headless">
                  <template #container="{ message, acceptCallback, rejectCallback }">
                    <div class="rounded p-4">
                      <span>{{ message.message }}</span>
                      <div class="flex flex-row justify-end gap-2 mt-2">
                        <Button
                          label="Отмена"
                          variant="outlined"
                          @click="rejectCallback()"
                          size="small"
                          text
                        ></Button>
                        <Button label="Удалить" @click="acceptCallback" size="small" severity="danger"></Button>
                      </div>
                    </div>
                  </template>
                </ConfirmPopup>
              </div>
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
import { useConfirm } from 'primevue'

const username = ref('')
const password = ref('')
const email = ref('')

const users = ref<User[]>([])
const tableLoading = ref<boolean>(true)
const toast = useToast()

const getItems = async () => {
  const { data: usersData } = await api.get<any>('/users/get')
    if (usersData) {
      users.value = usersData.data
      tableLoading.value = false
    }
}

const confirm = useConfirm()
const requireConfirmation = (event, data: User) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: `Вы уверены что хотите удалить пользователя ${data.username}?`,
    accept: () => {
      handleDelete(data)
    },
    reject: () => {},
  })
}

const handleCreate = async () => {
  const { data, error } = await api.post<any>('/users/createWithRoles', {
    email: email.value.toString(),
    password: password.value,
    username: username.value,
    roles: ['user'],
  })
  if (data) {
    toast.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Пользователь успешно создан!',
      life: 3000,
    })
    username.value = ''
    email.value = ''
    password.value = ''
    await getItems()
  } else {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: error?.message || 'Ошибка при создании пользователя!',
      life: 3000,
    })
  }
}

const handleEdit = (userData: User): void => {
  console.log(userData.username)
}

const handleDelete = async (userData: User) => {
  const { data, error } = await api.delete<any>(`/users/delete/${userData.id}`)

  if (data) {
    toast.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: `Пользователь ${userData.username} помечен как удаленный`, 
      life: 3000,
    })
    await getItems()
  }

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Произошла ошибка при удалении пользователя!',
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
  await getItems()
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
