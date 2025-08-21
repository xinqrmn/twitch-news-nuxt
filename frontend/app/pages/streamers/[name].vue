<script setup lang="ts">
import Header from '~/components/streamer/Header.vue'
import Stats from '~/components/streamer/stats/Stats.vue'
import Bio from '~/components/streamer/bio/Bio.vue'

import type { TabsItem } from '@nuxt/ui'
import type { IStreamer } from '~/types/streamer'
import type { IStreamerVideos } from '~/types/streamerVideos'

const items = [
  {
    label: 'Статистика',
    icon: 'mdi:database-outline',
    slot: 'statistics' as const,
  },
  {
    label: 'Биография',
    icon: 'mdi:account-outline',
    slot: 'biography' as const,
  },
] satisfies TabsItem[]

const route = useRoute()
const name = route.params.name as string

useHead({
  title: 'TwitchNews | ' + name,
})

const { data: streamer } = await useFetch<IStreamer>(`/api/streamers/${name}`)
const { data: streamerVideos } = await useFetch<IStreamerVideos>(`/api/streamersVideos/${name}`)
</script>

<template>
  <section v-if="streamer" class="col-span-full">
    <Header :streamer="streamer" :article="streamer.bio?.article"></Header>
    <UTabs :items="items" class="gap-4">
      <template #statistics="{ item }">
        <Stats :stats="streamer.stats" :videos="streamerVideos?.videos" />
      </template>

      <template #biography="{ item }">
        <Bio :bio="streamer.bio" />
      </template>
    </UTabs>
  </section>
  <section v-else class="flex items-center justify-center col-span-full">
    <p>Данных нет</p>
    <img
      src="https://www.meme-arsenal.com/memes/f8f6e7873be56ba281665a5a5bb838c4.jpg"
      alt="увы"
      class="w-full object-contain max-h-[500px]"
    />
  </section>
</template>

<style scoped lang="scss">
.main {
  &-left,
  &-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
