<script setup lang="ts">
import { useTagsStore } from '@/stores/tags'
import { onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

const tagsStore = useTagsStore()
const dt = ref()
const newTag = ref('')
const visibleTag = ref<boolean>(false)
const confirm = useConfirm()

const handleDelete = (id: number) => {
  confirm.require({
    message: 'Вы действительно хотите удалить тег?',
    header: 'Подтверждение удаления',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: async () => {
      await tagsStore.deleteTagById(id)
    },
  })
}

const exportCSV = () => {
  dt.value.exportCSV()
}

const handleCreate = async () => {
  await tagsStore.createNewTag({ name: newTag.value })
  await tagsStore.getAllTags()
  newTag.value = ''
  visibleTag.value = false
}

onMounted(async () => {
  await tagsStore.getAllTags()
})
</script>

<template>
  <DataTable
    class="h-full"
    ref="dt"
    :value="tagsStore.list"
    lazy
    paginator
    :total-records="tagsStore.totalItems"
    :rows="tagsStore.pagination?.limit ?? 5"
    :loading="tagsStore.loading"
    :rows-per-page-options="[5, 10, 20, 50]"
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h4 class="text-xl font-bold">Категории</h4>
        <Button
          label="Создать категорию"
          variant="text"
          icon="pi pi-plus"
          @click="visibleTag = true"
        ></Button>
      </div>
    </template>
    <template #paginatorstart>
      <Button type="button" icon="pi pi-refresh" text @click="postsStore.getAllTags()"></Button>
    </template>
    <template #paginatorend>
      <Button type="button" icon="pi pi-upload" text @click="exportCSV($event)"></Button>
    </template>
    <Column field="id" header="Id"></Column>
    <Column field="name" header="Name"></Column>
    <Column>
      <template #body="{ data }">
        <div class="flex justify-end items-center gap-2">
          <Button
            icon="pi pi-pencil"
            severity="success"
            @click="console.log('edit categories')"
          ></Button>
          <Button icon="pi pi-trash" severity="danger" @click="handleDelete(data.id)"></Button>
        </div>
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="visibleTag"
    modal
    header="Создание нового тега"
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4 flex-wrap">
      <label for="username" class="font-semibold w-full">Имя Тега</label>
      <InputText
        v-model="newTag"
        id="username"
        class="flex-auto"
        placeholder="Evelone..."
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Отменить"
        severity="secondary"
        @click="visibleTag = false"
      ></Button>
      <Button type="submit" label="Сохранить" @click="handleCreate()"></Button>
    </div>
  </Dialog>
</template>

<style scoped></style>
