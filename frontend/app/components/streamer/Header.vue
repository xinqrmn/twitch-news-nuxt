<template>
  <div class="flex-col items-center gap-6 p-3 rounded-2xl mb-4 streamer">
    <div class="flex gap-6">
      <div>
        <div class="rounded-[5px] overflow-hidden">
          <img :src="streamer.avatar" class="h-full" :alt="streamer.displayName + 'logo'" />
        </div>
        <div class="flex gap-3 w-full justify-between">
          <UButton variant="ghost" icon="line-md:arrow-small-left" to="/streamers"></UButton>
          <UButton variant="ghost" icon="mdi:share-variant-outline" to="/streamers"></UButton>
          <UButton variant="ghost" icon="line-md:chat-round" to="/streamers"></UButton>
        </div>
      </div>
      <div class="flex flex-col justify-between">
        <div>
          <h4 class="text-[1rem] text-gray-600">{{ streamer.name }}</h4>
          <h1 class="text-3xl font-bold">{{ streamer.displayName }}</h1>
        </div>

        <div class="flex gap-4 items-center text-sm text-gray-400">
          <UBadge
            :color="streamer.isLive ? 'success' : 'error'"
            :icon="streamer.isLive ? 'mdi:circle' : 'mdi:web-off'"
            size="md"
            variant="subtle"
            :ui="{ leadingIcon: `size-3 ${streamer.isLive ? 'animate-pulse' : ''}` }"
          >
            {{ streamer.isLive ? 'LIVE' : 'Offline' }}
          </UBadge>
          <span>Язык: {{ streamer.language }}</span>
          <span>Создан: {{ streamer.createdAt }} ({{ streamer.accountAge }})</span>
        </div>

        <div class="flex gap-3">
          <UButton color="primary" @click="watchStream">Смотреть</UButton>
          <UButton variant="outline" @click="addToFavorites"> Добавить в избранное </UButton>
        </div>
        <p class="text-sm text-gray-400 p-1.5">
          {{ streamer.followersOnSite }} человек следят на нашем сайте
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IStreamer } from '~/types/streamer'

const props = defineProps<{
  streamer: IStreamer
  article: string | undefined
}>()

const watchStream = () => {
  window.open(`https://twitch.tv/${props.streamer.displayName}`, '_blank')
}
const addToFavorites = () => {
  console.log('Добавили в избранное')
}
</script>

<style lang="scss" scoped>
.streamer {
  background-color: $color-background-topics;
  border: 1px solid $color-background-topics-border;
  border-radius: 5px;
}
</style>
