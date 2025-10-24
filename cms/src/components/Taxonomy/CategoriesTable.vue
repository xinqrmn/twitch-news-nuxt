<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'

const categoriesStore = useCategoriesStore()
const dt = ref()
const newCat = ref('')
const visible = ref<boolean>(false)
const confirm = useConfirm()

const handleDelete = (id: number) => {
  confirm.require({
    message: 'Вы действительно хотите удалить категорию?',
    header: 'Подтверждение удаления',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    accept: async () => {
      await categoriesStore.deleteCategoryById(id)
    },
  })
}

const exportCSV = () => {
  dt.value.exportCSV()
}

const handleCreate = async () => {
  await categoriesStore.createNewCategory({ name: newCat.value })
  await categoriesStore.getAllCategories()
  newCat.value = ''
  visible.value = false
}

onMounted(async () => {
  await categoriesStore.getAllCategories()
})
</script>

<template>
  <DataTable
    class="h-full"
    ref="dt"
    :value="categoriesStore.list"
    lazy
    paginator
    :total-records="categoriesStore.totalItems"
    :rows="categoriesStore.pagination?.limit ?? 5"
    :loading="categoriesStore.loading"
    :rows-per-page-options="[5, 10, 20, 50]"
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h4 class="text-xl font-bold">Категории</h4>
        <Button
          label="Создать категорию"
          variant="text"
          icon="pi pi-plus"
          @click="visible = true"
        ></Button>
      </div>
    </template>
    <template #paginatorstart>
      <Button
        type="button"
        icon="pi pi-refresh"
        text
        @click="postsStore.getAllCategories()"
      ></Button>
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
    v-model:visible="visible"
    modal
    header="Создание новой категории"
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4 flex-wrap">
      <label for="username" class="font-semibold w-full">Имя категории</label>
      <InputText
        v-model="newCat"
        id="username"
        class="flex-auto"
        placeholder="Escape from tarkov..."
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Отменить" severity="secondary" @click="visible = false"></Button>
      <Button type="submit" label="Сохранить" @click="handleCreate()"></Button>
    </div>
  </Dialog>
</template>

<style scoped></style>
