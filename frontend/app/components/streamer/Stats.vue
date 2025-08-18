<template>
  <div>
      viewers: <p class="text-sm">{{ props.stats.viewers }}</p>
      followers: <p class="text-2xl">{{ props.stats.followers }}</p>
      subs: <p class="text-2xl">{{ props.stats.subs }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ stats: { viewers: number; followers: number; subs: number } }>()
</script>
