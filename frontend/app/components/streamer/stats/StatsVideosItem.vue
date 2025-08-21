<script setup lang="ts">
import type { IStreamerVideo } from '~/types/streamerVideos'

const props = defineProps<{
  data: IStreamerVideo
}>()
</script>

<template>
  <div class="">
    <p>{{ props.data.imageUrl }}</p>
    <p>{{ props.data.category }}</p>
    <p>{{ props.data.title }}</p>
    <p>{{ props.data.duration }}</p>
    <p>{{ props.data.date }}</p>
    <p>{{ props.data.watches }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
