<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatTime } from '@/utils/timeFormatter'
import { useConfirm } from 'primevue/useconfirm'

const postsStore = usePostsStore()
const router = useRouter()
const dt = ref()
const confirm = useConfirm()

const handleDelete = (id: number) => {
  confirm.require({
    message: 'Вы действительно хотите удалить пост?',
    header: 'Подтверждение удаления',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: async () => {
      await postsStore.deletePost(id)
    },
  })
}

const exportCSV = () => {
  dt.value.exportCSV()
}

onMounted(async () => {
  await postsStore.fetchPosts()
})
</script>

<template>
  <DataTable
    ref="dt"
    :value="postsStore.list"
    lazy
    paginator
    :totalRecords="postsStore.totalItems"
    :rows="postsStore.pagination?.limit ?? 5"
    :loading="postsStore.loading"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
    <template #paginatorstart>
      <Button type="button" icon="pi pi-refresh" text @click="postsStore.fetchPosts()"></Button>
    </template>
    <template #paginatorend>
      <Button type="button" icon="pi pi-upload" text @click="exportCSV($event)"></Button>
    </template>

    <Column field="id" header="Id" />
    <Column header="Author">
      <template #body="{ data }">
        <div class="flex items-center gap-2">
          <img :src="data.author.image_url" alt="avatar" class="w-6 h-6 rounded-full" />
          <span>{{ data.author.username }}</span>
        </div>
      </template>
    </Column>
    <Column field="title" header="Title" />
    <Column field="subtitle" header="Subtitle" />
    <Column field="created_at" header="Created At" sortable>
      <template #body="{ data }">
        {{ formatTime(data.created_at) }}
      </template>
    </Column>
    <Column field="updated_at" header="Updated At">
      <template #body="{ data }">
        {{ formatTime(data.updated_at) }}
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div class="flex items-center gap-2">
          <Button
            icon="pi pi-pencil"
            severity="success"
            @click="router.push(`/posts/${data.id}`)"
          ></Button>
          <Button icon="pi pi-trash" severity="danger" @click="handleDelete(data.id)"></Button>
        </div>
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
</template>

<style scoped></style>
