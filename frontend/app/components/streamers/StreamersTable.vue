<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { ref, watch, onMounted } from 'vue'

const streamers = ref([])
const page = ref(1)
const maxPages = ref(10)
const limits = ref([10, 25, 50])
const limit = ref(10)

async function fetchStreamers() {
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
  })
  streamers.value =
    res?.data.map((item) => ({
      streamedMinutes: item.streamedminutes,
      maxViewers: item.maxviewers,
      avgViewers: item.avgviewers,
      followers: item.followers,
      followersGained: item.followersgained,
      logo: item.logo,
      twitchUrl: item.twitchurl,
      displayName: item.displayname,
      id: item.id,
      position: item.rownum,
    })) || []
  console.log(streamers.value)
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

      <USelect v-model="limit" variant="outline" color="primary" :items="limits"></USelect>
    </div>

    <Table class="mb-3">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead class="min-w-12">Лого</TableHead>
          <TableHead>Имя</TableHead>
          <TableHead>Сабы всего</TableHead>
          <TableHead>Сабы за 7 дней</TableHead>
          <TableHead>Время в потоке</TableHead>
          <TableHead>Max зрителей</TableHead>
          <TableHead>Avg зрителей</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="streamer in streamers" :key="streamer.id">
          <TableCell>{{ streamer.position }}</TableCell>
          <TableCell>
            <NuxtLink :to="streamer.twitchUrl" target="_blank">
              <img :src="streamer.logo" :alt="`${streamer.displayName + 'logo'}`" />
            </NuxtLink>
          </TableCell>
          <TableCell>
            <NuxtLink :to="streamer.twitchUrl" target="_blank">
              {{ streamer.displayName }}
            </NuxtLink>
          </TableCell>
          <TableCell>{{ streamer.followers }}</TableCell>
          <TableCell>{{ streamer.followersGained }}</TableCell>
          <TableCell>{{ streamer.streamedMinutes }}</TableCell>
          <TableCell>{{ streamer.maxViewers }}</TableCell>
          <TableCell>{{ streamer.avgViewers }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <use-clinet>
      <Pagination :items-per-page="10" :total="100">
        <PaginationContent>
          <PaginationPrevious @click="changePage(page - 1)" />

          <template v-for="p in maxPages" :key="p">
            <PaginationItem :value="p" :is-active="p === page" @click="changePage(p)">
              {{ p }}
            </PaginationItem>
          </template>

          <PaginationNext @click="changePage(page + 1)" />
        </PaginationContent>
      </Pagination>
    </use-clinet>
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
}

table {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  tbody,
  thead {
    tr {
      color: #fff;
      transition: all 0.2s;

      &:nth-child(odd) {
        background-color: rgba($color-background, 0);
      }

      &:nth-child(even) {
        background-color: rgba($color-background, 0);
      }

      &:hover {
        background-color: rgba($color-background, 0.4);
        color: $color-background-primary;
      }
    }
  }

  thead tr th {
    color: #fff;
  }
}
</style>
