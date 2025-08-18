<template>
  <div class="main-content--right">
      <p class="text-sm">{{ props.stats.viewers }}</p>
      <p class="text-2xl">{{ props.stats.followers }}</p>
      <p class="text-2xl">{{ props.stats.subs }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ stats: { viewers: number; followers: number; subs: number } }>()
</script>
