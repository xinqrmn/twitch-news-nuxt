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
  <main class="main-container">
    <div class="container main-grid">
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
    </div>
  </main>
</template>

<style scoped lang="scss">
.main-container {
  flex-grow: 1;
  background: $color-background;
  //background: url('/images/main-bg.png') no-repeat #000 fixed;
  //background-size: cover;
  padding-top: 12rem;
  padding-bottom: 2rem;
}
.main {
  &-left,
  &-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.main-grid {
  background: $color-background-main;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 1024px) {
  .main{
    &-left{
      gap: 0.5rem;
    }
    &-grid{
      grid-template-columns: 1fr;
      padding: 0.5rem;
    }
  
    &-container{
      padding-top: 2rem;
    }
  
    &-right{
      display: none;
    }
  }
}
</style>
