<template>
  <NuxtLink class="w-1/4 main-content--right" :to="props.item.link">
    <img
      :src="'/' + props.item.image"
      :alt="props.item.image"
      class="block object-cover mb-2 h-[120px] w-full"
    />
    <div class="text-sm text-muted-foreground flex gap-2 mb-2 items-center">
      <span class="">{{ props.item.date }}</span>
        <Icon name="mdi:circle-medium" />
        <span class="flex items-center gap-2">
          {{ props.item.views }}
          <Icon name="mdi:eye" />
        </span>
        <Icon name="mdi:circle-medium" />
        <span class="flex items-center gap-2">
          {{ props.item.comments }}
          <Icon name="mdi:comment" />
        </span>
    </div>
    <h2 class="mb-2">{{ props.item.title }}</h2>
    <div class="flex items-center gap-2">
      <UBadge variant="solid">{{ props.item.category }}</UBadge>
      <UBadge v-for="tag in props.item.tags" :key="tag" variant="outline">
        {{ tag }}
      </UBadge>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IBioNewsItem } from '~/types/streamer'

const props = defineProps<{
  item: IBioNewsItem
}>()
</script>

<style scoped lang="scss"></style>
