<script setup lang="ts">
import type { IStreamerVideo } from '~/types/streamer'
import StatsVideosItem from '~/components/streamer/stats/StatsVideosItem.vue'

const props = defineProps<{
  videos: IStreamerVideo[] | undefined
}>()
</script>

<template>
  <div class="main-content--right col-span-4">
    <h3 class="title mb-2">Последние трансляции</h3>
    <UCarousel
      v-if="props.videos?.length"
      :items="props.videos"
      :autoplay="{ delay: 3000 }"
      auto-height
      arrows
      :prev="{ variant: 'ghost', color: 'primary' }"
      :next="{ variant: 'ghost', color: 'primary' }"
      class="w-full flex flex-nowrap gap-4"
      :ui="{
        item: 'basis-1/5',
        controls: 'absolute -top-6 right-12',
        prev: 'h-fit rounded-[5px]',
        next: 'h-fit rounded-[5px]',
      }"
    >
      <template #default="{ item }: { item: IStreamerVideo }">
        <StatsVideosItem :key="item.videoId" :data="item" />
      </template>
    </UCarousel>
    <div v-else class="p-4 text-center text-gray-400 border border-dashed rounded-lg">
      Нет трансляций 💤
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
