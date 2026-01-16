<script setup lang="ts">
import { MediaFile } from '@/types/mediaFile'
import { ref } from 'vue'

const media = ref<MediaFile[]>([
  {
    uuid: '0c7111bb-b275-4c46-9763-35a253a171a4-gandonio-_uebische.jpg',
    name: 'gandonio-_uebische.jpg',
    url: 'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/0c7111bb-b275-4c46-9763-35a253a171a4-gandonio-_uebische.jpg',
    created_at: '2025-11-25T10:52:02.768Z',
  },
  {
    uuid: '7469b216-9dff-4e2b-a32e-1c7372576fb7-gandonio-_uebische.jpg2',
    name: 'gandonio-_uebische.jpg',
    url: 'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/7469b216-9dff-4e2b-a32e-1c7372576fb7-gandonio-_uebische.jpg',
    created_at: '2025-11-25T10:49:31.256Z',
  },
  {
    uuid: '3ce21737-fc83-4dce-8a4c-a2a1fd061c6c-yjz4ghz00p0z68ck2s45955kl0tkgau4_1_0_1748340072462.jpg3',
    name: 'yjz4ghz00p0z68ck2s45955kl0tkgau4_1_0_1748340072462.jpg',
    url: 'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/3ce21737-fc83-4dce-8a4c-a2a1fd061c6c-yjz4ghz00p0z68ck2s45955kl0tkgau4_1_0_1748340072462.jpg',
    created_at: '2025-11-25T10:43:30.382Z',
  },
  {
    uuid: '8b482141-5f5e-448c-9593-5fef8e5fdd57-syrneke.jpg',
    name: 'syrneke.jpg',
    url: 'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/8b482141-5f5e-448c-9593-5fef8e5fdd57-syrneke.jpg4',
    created_at: '2025-11-25T10:42:19.648Z',
  },
  {
    uuid: '0c7111bb-b275-4c46-9763-35a253a171a4-gandonio-_uebische.jpg5',
    name: 'gandonio-_uebische.jpg',
    url: 'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/0c7111bb-b275-4c46-9763-35a253a171a4-gandonio-_uebische.jpg',
    created_at: '2025-11-25T10:52:02.768Z',
  },
  {
    uuid: '7469b216-9dff-4e2b-a32e-1c7372576fb7-gandonio-_uebische.jpg6',
    name: 'gandonio-_uebische.jpg',
    url: 'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/7469b216-9dff-4e2b-a32e-1c7372576fb7-gandonio-_uebische.jpg',
    created_at: '2025-11-25T10:49:31.256Z',
  },
  {
    uuid: '3ce21737-fc83-4dce-8a4c-a2a1fd061c6c-yjz4ghz00p0z68ck2s45955kl0tkgau4_1_0_1748340072462.jpg7',
    name: 'yjz4ghz00p0z68ck2s45955kl0tkgau4_1_0_1748340072462.jpg',
    url: 'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/3ce21737-fc83-4dce-8a4c-a2a1fd061c6c-yjz4ghz00p0z68ck2s45955kl0tkgau4_1_0_1748340072462.jpg',
    created_at: '2025-11-25T10:43:30.382Z',
  },
  {
    uuid: '8b482141-5f5e-448c-9593-5fef8e5fdd57-syrneke.jpg8',
    name: 'syrneke.jpg',
    url: 'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/8b482141-5f5e-448c-9593-5fef8e5fdd57-syrneke.jpg',
    created_at: '2025-11-25T10:42:19.648Z',
  },
])

const selectedMedia = ref<MediaFile[]>([])

const selectorOptions = ['Все', 'Только выбранные']
const onlySelected = ref<'Все' | 'Только выбранные'>('Все')

const viewSearch = ref<string>()

let searchTimeout
const onSearch = () => {
  clearTimeout(searchTimeout)
  // searchTimeout = setTimeout(() => usersStore.fetchUsers({ search: tableSearch.value.trim() }), 350)
}
</script>

<template>
  <div class="card h-full">
    <DataView
      :value="onlySelected === 'Все' ? media : selectedMedia"
      paginator
      layout="grid"
      :totalRecords="media.length"
      :rows="20"
      :pt="{ root: 'flex flex-col h-full', content: 'h-full overflow-y-auto mx-2' }"
    >
      <template #header>
        <div class="flex flex-nowrap w-full">
          <div class="flex">
            <SelectButton v-model="onlySelected" :options="selectorOptions" :allowEmpty="false" />
          </div>
          <div class="ml-auto">
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
          <div v-for="item in slotProps.items" :key="item.uuid">
            <div
              class="p-2 relative border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col overflow-hidden"
            >
              <div class="absolute top-2 right-2">
                <Checkbox v-model="selectedMedia" :inputId="item.uuid" :value="item" />
              </div>
              <div class="rounded w-full h-[100px]">
                <img
                  class="w-full h-full object-cover"
                  :src="item.url"
                  :alt="item.name"
                  :value="item"
                />
              </div>
              <div class="pt-1">
                <div class="text-md font-medium overflow-ellipsis overflow-hidden mt-1">
                  {{ item.name }}
                </div>
                <span class="text-[0.75rem] font-thin text-gray-400"
                  >Добавлено:
                  {{
                    new Date(item.created_at).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #paginatorend>
        <div class="flex gap-4 justify-end">
          <Button label="Прикрепить" class="p-button-success" :disabled="selectedMedia.length === 0" @click="console.log('zxc')" />
        </div>
      </template>
    </DataView>
  </div>
</template>

<style scoped></style>
