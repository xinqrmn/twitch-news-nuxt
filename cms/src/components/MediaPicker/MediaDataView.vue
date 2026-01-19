<script setup lang="ts">
import { MediaFile } from '@/types/mediaFile'
import { useStorageStore } from '@/stores/storage'
import { PaginationParams } from '@/utils/requestHandler'
import { onBeforeMount, onMounted, ref } from 'vue'

const storageStore = useStorageStore()
const props = defineProps<{
  items: string[]
}>()

const selectedMedia = ref<string[]>(props.items)

const selectorOptions = ['Все', 'Только выбранные']
const onlySelected = ref<'Все' | 'Только выбранные'>('Все')


//DataView methods
const viewSearch = ref<string>()

const first = ref(0)
let searchTimeout
const onSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => storageStore.fetchStorage({ search: viewSearch.value.trim() }), 350)
}

const onPage = async (event: any) => {
  first.value = event.first
  await storageStore.fetchStorage({
    currentPage: event.page + 1,
    limit: event.rows,
    search: viewSearch.value.trim(),
  })
}

onBeforeMount(async () => {
  await storageStore.fetchStorage()
})
</script>

<template>
  <div class="card h-full">
    <DataView
      :value="onlySelected === 'Все' ? storageStore.urlList : selectedMedia"
      paginator
      :first="first"
      layout="grid"
      :totalRecords="storageStore.totalItems"
      :rows="20"
      @page="onPage"
      :pt="{ root: 'flex flex-col h-full', content: 'h-full overflow-y-auto mx-2' }"
    >
      <template #header>
        <div class="flex flex-nowrap w-full">
          <div class="flex">
            <SelectButton v-model="onlySelected" :options="selectorOptions" :allowEmpty="false" />
          </div>
          <div class="ml-auto" v-if="onlySelected === 'Все'">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="viewSearch" @input="onSearch()" placeholder="Найти..." />
            </IconField>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="grid grid-cols-4 gap-2 py-2">
          <div v-for="item in slotProps.items" :key="item">
            <div
              class="p-2 relative border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col overflow-hidden"
            >
              <div class="absolute top-2 right-2">
                <Checkbox
                  v-model="selectedMedia"
                  :inputId="item"
                  :value="item"
                  style="z-index: 2"
                />
              </div>
              <div class="rounded w-full h-[100px]">
                <img
                  class="w-full h-full object-cover"
                  :src="item"
                  :alt="item"
                  :value="item"
                />
              </div>
              <div class="pt-1">
                <div class="text-md font-medium overflow-ellipsis overflow-hidden mt-1" :title="item.split('/').at(-1).slice(37)">
                  {{ item.split('/').at(-1).slice(37) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #paginatorend>
        <div class="flex gap-4 justify-end">
          <Button
            label="Прикрепить"
            class="p-button-success"
            :disabled="selectedMedia.length === 0"
            @click="console.log('zxc')"
          />
        </div>
      </template>
    </DataView>
  </div>
</template>

<style scoped></style>
