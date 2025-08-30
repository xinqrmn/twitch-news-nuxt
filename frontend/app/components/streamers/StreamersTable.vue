<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useGlobals } from '~/stores/globals'

const streamersTable = useTemplateRef('streamersTable')
const UAvatar = resolveComponent('UAvatar')

const globals = useGlobals()

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
      return h(
        'a',
        { class: 'flex items-center gap-3', href: `/streamers/${row.original.displayName}` },
        [
          h(UAvatar, {
            ...row.original.logo,
            size: 'lg',
          }),
          h('div', undefined, [
            h('p', { class: 'font-medium text-highlighted' }, row.original.displayName),
          ]),
        ]
      )
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
  // eslint-disable-next-line
  const res = await $fetch('/api/streamers', {
    // EsLint ignore
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
    <div class="flex mb-4 items-center justify-between">
      <h2 class="title">Топ Стримеров</h2>
      <div>
        {{ globals.isMobile ? 'Элементы:' : 'Количество элементов:' }}
        <USelect v-model="limit" variant="outline" color="primary" :items="limits" />
      </div>
    </div>

    <!-- Desktop Table -->
    <div v-if="!globals.isMobile" class="desktop-table">
      <UTable
        ref="streamersTable"
        sticky
        class="flex-1 max-h-[38rem]"
        :data="streamers"
        :columns="tableColumns"
        :loading="tableLoading === true"
      >
        <template #empty>
          <img
            src="https://www.meme-arsenal.com/memes/f8f6e7873be56ba281665a5a5bb838c4.jpg"
            alt="увы"
            class="w-full object-contain max-h-[500px]"
          />
        </template>
      </UTable>
    </div>

    <!-- Mobile Cards -->
    <div v-else class="mobile-cards">
      <img
        v-if="tableLoading"
        src="https://www.meme-arsenal.com/memes/f8f6e7873be56ba281665a5a5bb838c4.jpg"
        alt="увы"
        class="w-full object-contain max-h-[500px]"
      />
      <UCard v-for="s in streamers" :key="s.position" ref="streamerCards" class="mb-3">
        <template #header>
          <NuxtLink :to="`/streamers/${s.displayName}`">
            <div class="flex items-center gap-3">
              <UAvatar :src="s.logo.src" size="lg" />
              <div>
                <p class="font-semibold text-highlighted">{{ s.displayName }}</p>
                <p>Сабы всего: {{ s.followers }}</p>
              </div>
            </div>
          </NuxtLink>
        </template>

        <div class="w-full grid grid-rows-2 grid-cols-2 gap-2">
          <div class="mobile-card--info">
            <UIcon name="mdi:account-group-outline" size="20" />
            <div>
              <p class="font-semibold">Сабы за 7 дней:</p>
              <p>{{ s.followersGained }}</p>
            </div>
          </div>
          <div class="mobile-card--info">
            <UIcon name="mdi:timer-outline" size="20" />
            <div>
              <p class="font-semibold">Время в потоке:</p>
              <p>{{ s.streamedMinutes }} мин.</p>
            </div>
          </div>
          <div class="mobile-card--info">
            <UIcon name="iconoir:user-crown" size="20" />
            <div>
              <p class="font-semibold">Max зрителей:</p>
              <p>{{ s.maxViewers }}</p>
            </div>
          </div>
          <div class="mobile-card--info">
            <UIcon name="mdi:account-badge-outline" size="20" />
            <div>
              <p class="font-semibold">Avg зрителей:</p>
              <p>{{ s.avgViewers }}</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

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
</template>

<style scoped lang="scss">
.main-content {
  @media (max-width: 768px) {
    .mobile-cards {
      UCard {
        cursor: pointer;

        .pl-20 {
          padding-left: 5rem; // отступ для текста в Collapse
        }
      }
    }
  }
}

.mobile-card {
  &--info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid $color-background-topics-border;
  }
}
</style>
