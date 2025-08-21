<script setup lang="ts">
import type { IStreamerVideo } from '~/types/streamerVideos'
import { secondsToTime, formatNumber } from '#imports'

const props = defineProps<{
  data: IStreamerVideo
}>()
</script>

<template>
  <NuxtLink
    class="video overflow-hidden"
    :to="`https://www.twitch.tv/videos/${props.data.videoId}`"
    target="_blank"
  >
    <div class="video-image relative pb-0.5">
      <img :src="props.data.imageUrl" />
      <NuxtTime
        :datetime="props.data.date"
        locale="ru-RU"
        relative
        class="absolute m-2 top-0 rounded-[5px] px-[0.4rem] bg-[rgba(0,0,0,0.7)]"
      />
      <div class="p-2 absolute bottom-0 w-full flex justify-between">
        <div class="rounded-[5px] px-[0.4rem] bg-[rgba(0,0,0,0.6)]">
          {{ formatNumber(props.data.watches) }}
        </div>
        <div class="rounded-[5px] px-[0.4rem] bg-[rgba(0,0,0,0.6)]">
          {{ secondsToTime(props.data.duration) }}
        </div>
      </div>
    </div>
    <div class="video-title flex flex-col">
      <h3
        class="text-white font-bold text-ellipsis whitespace-nowrap w-full overflow-hidden"
        :title="props.data.title"
      >
        {{ props.data.title }}
      </h3>
      <h4 class="text-xs text-gray-700">{{ props.data.category }}</h4>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.video {
  width: 20%;
  border-radius: 5px;
  &-image {
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
