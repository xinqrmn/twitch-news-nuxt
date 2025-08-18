<template>
  <div class="flex items-center gap-6 bg-neutral-900 p-6 rounded-2xl shadow-lg main-content">
    <img :src="streamer.avatar" class="h-full" :alt="streamer.displayName + 'logo'" />

    <div class="flex-1 space-y-2">
      <h1 class="text-3xl font-bold">{{ streamer.displayName }}</h1>

      <div class="flex gap-4 items-center text-sm text-gray-400">
        <span :class="streamer.isLive ? 'text-green-400' : 'text-red-400'">
          {{ streamer.isLive ? 'LIVE' : 'Offline' }}
        </span>
        <span>Язык: {{ streamer.language }}</span>
        <span>Создан: {{ streamer.createdAt }} ({{ streamer.accountAge }})</span>
      </div>

      <div class="flex gap-3 mt-2">
        <UButton color="primary" @click="watchStream">Смотреть</UButton>
        <UButton variant="outline" @click="addToFavorites"> Добавить в избранное </UButton>
      </div>
      <p class="text-sm text-gray-400 mt-1">
        {{ streamer.followersOnSite }} человек следят на нашем сайте
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ streamer: any }>()

const watchStream = () => {
  window.open(`https://twitch.tv/${props.streamer.displayName}`, '_blank')
}
const addToFavorites = () => {
  console.log('Добавили в избранное')
}
</script>
