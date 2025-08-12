<script setup lang="ts">
import MainHotTopics from '@/components/main/left/MainHotTopics.vue'
import TopEvents from '@/components/main/left/TopEvents.vue'
import NewsFeed from '@/components/main/left/NewsFeed.vue'

import TopStreamers from '@/components/main/right/TopStreamers.vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const isMobile = ref(false)
watch(
  width,
  () => {
    if (width.value < 1024) {
      isMobile.value = true
    } else isMobile.value = false
  },
  { immediate: true }
)
</script>

<template>
  <!-- Left side -->
  <section class="main-left">
    <MainHotTopics></MainHotTopics>
    <TopEvents></TopEvents>
    <NewsFeed :is-mobile="isMobile"></NewsFeed>
  </section>

  <!-- Right side -->
  <aside class="main-right">
    <TopStreamers title="стримеров"></TopStreamers>
    <TopStreamers title="сквадов"></TopStreamers>
  </aside>
</template>

<style scoped lang="scss">
.main {
  &-left,
  &-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 1024px) {
  .main {
    &-left {
      gap: 0.5rem;
    }

    &-grid {
      grid-template-columns: 1fr;
      padding: 0.5rem;
    }

    &-container {
      padding-top: 2rem;
    }

    &-right {
      display: none;
    }
  }
}
</style>
