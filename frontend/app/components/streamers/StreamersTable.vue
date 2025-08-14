<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const streamersTable = useTemplateRef('streamersTable')
const UAvatar = resolveComponent('UAvatar')

const page = ref(1)
const maxPages = ref(100)
const tableLoading = ref<boolean>(true)
const limits = ref([10, 25, 50])
const limit = ref(10)

type RawStreamerInfo = {
  id: number
  rownum: number
  twitchurl: string
  logo: string
  displayname: string
  followers: number
  followersgained: number
  streamedminutes: number
  maxviewers: number
  avgviewers: number
}

type StreamerInfo = {
  position: number
  twitchUrl: string
  logo: { src: string }
  displayName: string
  followers: number
  followersGained: number
  streamedMinutes: number
  maxViewers: number
  avgViewers: number
}
const streamers = ref<StreamerInfo[]>([])

const tableColumns: TableColumn<StreamerInfo>[] = [
  {
    accessorKey: 'position',
    header: '#',
    cell: ({ row }) => `#${row.getValue('position')}`,
  },
  {
    accessorKey: 'displayName',
    header: 'Имя',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          ...row.original.logo,
          size: 'lg',
        }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.displayName),
        ]),
      ])
    },
  },
  {
    accessorKey: 'followers',
    header: 'Сабы всего',
    cell: ({ row }) => `${row.getValue('followers')}`,
  },
  {
    accessorKey: 'followersGained',
    header: 'Сабы за 7 дней',
    cell: ({ row }) => `${row.getValue('followersGained')}`,
  },
  {
    accessorKey: 'streamedMinutes',
    header: 'Время в потоке',
    cell: ({ row }) => `${row.getValue('streamedMinutes') + ' мин.'}`,
  },
  {
    accessorKey: 'maxViewers',
    header: 'Max зрителей',
    cell: ({ row }) => `${row.getValue('maxViewers')}`,
  },
  {
    accessorKey: 'avgViewers',
    header: 'Avg зрителей',
    cell: ({ row }) => `${row.getValue('avgViewers')}`,
  },
]
async function fetchStreamers() {
  tableLoading.value = true
  const res = await $fetch('/api/streamers', {
    params: {
      days: 7,
      region: 227,
      page: page.value,
      sortColumn: 3,
      sortDirection: 'desc',
      offset: (page.value - 1) * limit.value,
      limit: limit.value,
    },
  }).then((res) => {
    streamers.value =
      res.data.map((item: RawStreamerInfo) => ({
        streamedMinutes: item.streamedminutes,
        maxViewers: item.maxviewers,
        avgViewers: item.avgviewers,
        followers: item.followers,
        followersGained: item.followersgained,
        logo: { src: item.logo },
        twitchUrl: item.twitchurl,
        displayName: item.displayname,
        position: item.rownum,
      })) || []
    console.log(streamers.value)
    tableLoading.value = false
  })

}

const changePage = (p: number) => {
  if (p < 1 || p > limit.value) return
  page.value = p
}

watch([page, limit], fetchStreamers)
onMounted(fetchStreamers)

// https://sullygnome.com/api/tables/channeltables/getchannels/7(Это за сколько дней)/227(это ру регион)/1(1 страница серверной пагинации)/3/desc/0/10(сколько показывать)
</script>

<template>
  <div class="main-content">
    <div class="class streamers__inner">
      <h2 class="title">Топ Стримеров</h2>

      <div>
        Количество элементов: 
        <USelect v-model="limit" variant="outline" color="primary" :items="limits"></USelect>
      </div>
    </div>
    <div class="streamers__table">
      <UTable
        ref="streamersTable"
        sticky
        class="flex-1 max-h-[38rem]"
        :data="streamers"
        :columns="tableColumns"
        :loading="tableLoading === true"
      >
      <template #empty>
        <img src="https://www.meme-arsenal.com/memes/64283ac08d8bb5ce15183505adfad503.jpg" alt="увы" style="width: 100%; object-fit: contain; max-height: 500px;">
      </template>
    </UTable>
      <div class="flex justify-center border-t border-default pt-4">
        <UPagination
          v-model:page="page"
          :default-page="1"
          :items-per-page="limit"
          :total="maxPages"
          @update:page="changePage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.streamers {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  &__table{
  }
}
</style>
