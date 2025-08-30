<template>
  <div class="grid md:grid-cols-4 grid-cols-2 gap-4 h-full">
    <StatsItem
      title="Фолловеры"
      icon="mdi:account-supervisor-outline"
      :data="props.stats?.followers"
    />
    <StatsItem
      title="Среднее кол-во зрителей"
      icon="mdi:eye-outline"
      :data="props.stats?.avgViewers"
    />
    <StatsItem
      title="MAX зрителей за стрим"
      icon="mdi:trophy-outline"
      :data="props.stats?.maxViewers"
    />
    <StatsItem title="Часов в потоке" icon="mdi:watch" :data="props.stats?.streamedHours" />

    <StatsLastVideos :videos="videos" class="videos"/>
  </div>
</template>

<script setup lang="ts">
import type { IStreamerVideo, IStreamerStats } from '~/types/streamer'
import StatsItem from '~/components/streamer/stats/StatsItem.vue'
import StatsLastVideos from '~/components/streamer/stats/StatsLastVideos.vue'

const props = defineProps<{
  stats: IStreamerStats | undefined
  videos: IStreamerVideo | undefined
}>()
</script>

<style scoped lang="scss">
.videos{
  grid-column: 1 / -1;
}
</style>
