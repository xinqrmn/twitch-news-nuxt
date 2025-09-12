<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { useConfirm } from 'primevue'
import { UpdateUserDto, User } from '@/types/user'
import { onBeforeMount } from 'vue'

const usersStore = useUsersStore()

const emit = defineEmits<{
  showDialog
  userDelete: [id: number]
}>()

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

const handleEdit = (data: UpdateUserDto) => {
  emit('showDialog', data)
}

const confirm = useConfirm()
const requireConfirmation = (event, data: Partial<User>) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: `Вы уверены что хотите удалить пользователя ${data.username}?`,
    accept: () => {
      emit('userDelete', data.id)
    },
    reject: () => {},
  })
}

onBeforeMount(async () => {
  await usersStore.fetchUsers()
})
</script>

<template>
  <DataTable
    :value="usersStore.list"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    tableStyle="min-width: 50rem h-full"
    :loading="usersStore.loading"
  >
    <template #paginatorstart>
      <Button type="button" icon="pi pi-refresh" text />
    </template>
    <template #paginatorend>
      <Button type="button" icon="pi pi-download" text />
    </template>
    <Column field="id" header="ID"></Column>
    <Column field="username" header="Имя пользователя">
      <template #body="{ data }">
        <div class="flex items-center">
          <Avatar
            class="mr-2 rounded-md overflow-hidden"
            v-if="data?.image_url"
            size="normal"
            :image="data.image_url"
          />
          <Avatar class="mr-2 rounded-md overflow-hidden" v-else size="normal" icon="pi pi-user" />
          <span class="text-semibold">{{ data.username }}</span>
        </div>
      </template>
    </Column>
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
    <Column field="created_at" header="Дата создания"></Column>
    <Column field="updated_at" header="Дата посл. редактирования"></Column>
    <Column class="w-24 !text-end">
      <template #body="{ data }">
        <div class="flex flex-row gap-2">
          <Button
            icon="pi pi-pencil"
            v-tooltip.bottom="'Редактировать пользователя'"
            @click="handleEdit({ id: data.id, email: data.email, image_url: data.image_url })"
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
                  <Button
                    label="Удалить"
                    @click="acceptCallback"
                    size="small"
                    severity="danger"
                  ></Button>
                </div>
              </div>
            </template>
          </ConfirmPopup>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped lang="scss"></style>
