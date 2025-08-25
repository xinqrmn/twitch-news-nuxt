<script setup lang="ts">
import TheHeader from '~/components/header/TheHeader.vue'
import TheFooter from '~/components/footer/TheFooter.vue'

const url = useRequestURL().pathname
const mainClass = computed(() => {
  return url.startsWith('/streamers/') ? 'main-container--streamer' : 'main-container'
})
</script>

<template>
  <section class="main-section">
    <TheHeader></TheHeader>
    <main :class="mainClass">
      <div class="container main-grid">
        <slot />
      </div>
    </main>
    <TheFooter></TheFooter>
  </section>
</template>

<style scoped lang="scss">
.main-grid {
  background: $color-background-main;
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 1rem;
  padding: 1rem;
  height: 100%;

  @media (max-width: 1024px) {
    padding: 0.5rem;
    grid-template-columns: 1fr;
  }
}

.main-container {
  flex-grow: 1;
  background: $color-background;
  //background: url('/images/main-bg.png') no-repeat #000 fixed;
  //background-size: cover;
  padding-top: 12rem;
  padding-bottom: 2rem;

  &--streamer {
    flex-grow: 1;
    background: $color-background;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
</style>
