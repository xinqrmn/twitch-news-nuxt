<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { useConfirm } from 'primevue'
import { UpdateUserDto, User } from '@/types/user'
import { onBeforeMount, ref } from 'vue'
import { formatTime } from '@/utils/timeFormatter'

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
      return 'secondary'
    case 'streamer_bio_author':
      return 'primary'
    case 'streamer_bio_editor':
      return 'warn'
    case 'news_author':
      return 'primary'
    case 'news_editor':
      return 'warn'

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

const tableSearch = ref('')
const first = ref(0)

let searchTimeout
const onSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => usersStore.fetchUsers({ search: tableSearch.value.trim() }), 350)
}

const onPage = async (event: any) => {
  first.value = event.first
  await usersStore.fetchUsers({
    currentPage: event.page + 1,
    limit: event.rows,
    search: tableSearch.value.trim(),
  })
}

const onSort = async (event: any) => {
  const sortField = event.sortField
  const sortOrder = event.sortOrder === 1 ? 'ASC' : 'DESC'
  await usersStore.fetchUsers({
    sortBy: sortField ? [[sortField, sortOrder]] : undefined,
    search: tableSearch.value.trim(),
  })
}

onBeforeMount(async () => {
  await usersStore.fetchUsers()
})
</script>

<template>
  <DataTable
    :value="usersStore.list"
    lazy
    paginator
    :totalRecords="usersStore.totalItems"
    :rows="usersStore.pagination?.limit ?? 5"
    :first="first"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    tableStyle="min-width: 50rem h-full"
    :loading="usersStore.loading"
    @page="onPage"
    @sort="onSort"
    :pt="{
      header: 'p-0',
    }"
    removableSort
  >
    <template #header>
      <div class="flex justify-between items-center gap-4">
        <p>
          Записей: <span class="font-semibold">{{ usersStore.totalItems }}</span>
        </p>
        <div>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="tableSearch" @input="onSearch()" placeholder="Найти..." />
          </IconField>
        </div>
      </div>
    </template>
    <template #paginatorstart>
      <Button type="button" icon="pi pi-refresh" text @click="usersStore.fetchUsers()" />
    </template>
    <template #paginatorend>
      <Button type="button" icon="pi pi-download" text />
    </template>
    <Column field="id" sortable header="ID"></Column>
    <Column field="username" sortable header="Имя пользователя">
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
    <Column field="email" sortable header="E-mail"></Column>
    <Column field="roles" header="Роли">
      <template #body="slotProps">
        <div class="flex flex-wrap gap-1">
          <Tag
            v-for="role in slotProps.data.roles"
            :value="role.cyrillic"
            :severity="getRoleTag(role.name)"
            :key="role.name"
          />
        </div>
      </template>
    </Column>
    <Column field="created_at" sortable header="Дата создания (МСК)">
      <template #body="slotProps">
        {{ formatTime(slotProps.data.created_at) }}
      </template>
    </Column>
    <Column field="updated_at" sortable header="Дата посл. редактирования (МСК)">
      <template #body="slotProps">
        {{ formatTime(slotProps.data.updated_at) }}
      </template>
    </Column>
    <Column class="w-24 !text-end">
      <template #body="{ data }">
        <div class="flex flex-row gap-2" v-if="data.username !== 'admin'">
          <Button
            icon="pi pi-pencil"
            v-tooltip.bottom="'Редактировать пользователя'"
            @click="
              handleEdit({
                id: data.id,
                email: data.email,
                image_url: data.image_url,
                roles: data.roles.map((r) => r.name),
              })
            "
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
