<script setup lang="ts">
import type { IStreamerVideo } from '~/types/streamerVideos'
import StatsVideosItem from '~/components/streamer/stats/StatsVideosItem.vue'

const props = defineProps<{
  videos: IStreamerVideo | undefined
}>()

console.log(props.videos)
</script>

<template>
  <div class="main-content--right col-span-4">
    <h3>Последние трансляции</h3>
    <div>
      <StatsVideosItem
        v-for="video in props.videos"
        :key="video.date"
        :data="video"
      ></StatsVideosItem>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
