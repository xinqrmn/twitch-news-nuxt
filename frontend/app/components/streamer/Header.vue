<template>
  <div class="main-content--right mb-4 flex flex-wrap md:flex-nowrap items-start gap-4">
    <!-- Левая часть: аватар + информация -->
    <div class="flex items-start gap-4 flex-1 min-w-0">
      <div class="rounded-[5px] overflow-hidden flex-shrink-0">
        <img
          :src="streamer.avatar"
          class="h-full w-30 object-cover"
          :alt="streamer.displayName + 'logo'"
        />
      </div>
      <div class="flex-1 min-w-0">
        <UTooltip text="* Признан иноагентом в РФ">
          <UButton variant="link" class="text-[1rem] text-gray-700 p-0 mb-0 zapret">
            {{ streamer.name }} <span>*</span>
          </UButton>
        </UTooltip>
        <div class="flex items-center gap-2 mb-2 flex-wrap">
          <h1 class="text-3xl font-bold truncate">{{ streamer.displayName }}</h1>
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
          <div class="mb-2 md:flex gap-2 flex-wrap hidden">
            <span>Язык: {{ streamer.language }}</span>
            <span>Создан: {{ streamer.createdAt }} ({{ streamer.accountAge }})</span>
          </div>
          <UBadge variant="outline" trailing-icon="mdi:cards-heart">
            {{ streamer.followersOnSite }}
          </UBadge>
        </div>
      </div>
    </div>

    <!-- Правая часть: кнопки -->
    <div class="flex flex-col gap-3 w-full md:w-auto justify-self-center">
      <div class="flex flex-col md:flex-row gap-3 w-full">
        <UButton color="primary" class="w-full md:w-auto grid place-items-center" @click="watchStream">Смотреть</UButton>
        <UButton
          variant="outline"
          icon="mdi:cards-heart-outline"
          class="w-full justify-center"
          @click="addToFavorites"
        >
          Добавить в избранное
        </UButton>
      </div>
      <div class="flex flex-wrap justify-between">
        <UButton variant="outline" icon="simple-icons:telegram" to="/streamers"></UButton>
        <UButton variant="outline" icon="simple-icons:steam" to="/streamers"></UButton>
        <UButton variant="outline" icon="simple-icons:twitch" to="/streamers"></UButton>
        <UTooltip text="Организация meta запрещена на территории РФ">
          <UButton variant="outline" icon="simple-icons:instagram" to="/streamers"></UButton>
        </UTooltip>
        <UButton variant="outline" icon="simple-icons:kick" to="/streamers"></UButton>
        <UButton variant="outline" icon="simple-icons:tiktok" to="/streamers"></UButton>
        <UButton variant="outline" icon="simple-icons:vk" to="/streamers"></UButton>
      </div>
      <UButton
        variant="outline"
        icon="mdi:share-variant-outline"
        to="/"
        class="w-full justify-center"
      >
        Поделиться
      </UButton>
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
.zapret {
  span {
    color: red;
  }
}
</style>
