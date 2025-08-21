<template>
  <div class="main-content--right mb-4 flex items-center gap-4">
    <div class="rounded-[5px] overflow-hidden">
      <img :src="streamer.avatar" class="h-full" :alt="streamer.displayName + 'logo'" />
    </div>
    <div class="flex justify-between gap-6 w-full">
      <div class="">
        <UButton variant="link" class="text-[1rem] text-gray-700 p-0 mb-0">{{
          streamer.name
        }}</UButton>
        <div class="flex items-center gap-2 mb-2">
          <h1 class="text-3xl font-bold">{{ streamer.displayName }}</h1>
          <UBadge
            :color="streamer.isLive ? 'error' : 'neutral'"
            :icon="streamer.isLive ? 'mdi:circle' : 'mdi:web-off'"
            size="md"
            variant="subtle"
            :ui="{ leadingIcon: `size-3 ${streamer.isLive ? 'animate-pulse' : ''}` }"
          >
            {{ streamer.isLive ? 'LIVE' : 'Offline' }}
          </UBadge>
        </div>
        <div class="text-gray-400">
          <div class="mb-2 flex gap-2">
            <span>Язык: {{ streamer.language }}</span>
            <span>Создан: {{ streamer.createdAt }} ({{ streamer.accountAge }})</span>
          </div>
          <UBadge variant="outline" trailing-icon="mdi:cards-heart">{{ streamer.followersOnSite }}</UBadge>
        </div>
      </div>

      <div class="flex gap-3 flex-col justify-center">
        <div class="flex items-center gap-3">
          <UButton color="primary" @click="watchStream">Смотреть</UButton>
          <UButton variant="outline" icon="mdi:cards-heart-outline" @click="addToFavorites">
            Добавить в избранное
          </UButton>
        </div>
        <div class="flex gap-3 w-full">
          <UButton variant="outline" icon="simple-icons:telegram" to="/streamers"></UButton>
          <UButton variant="outline" icon="simple-icons:steam" to="/streamers"></UButton>
          <UButton variant="outline" icon="simple-icons:twitch" to="/streamers"></UButton>
          <UButton
            variant="outline"
            icon="mdi:share-variant-outline"
            to="/"
            class="w-full justify-center"
            >Поделиться
          </UButton>
        </div>
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

<style lang="scss" scoped></style>
