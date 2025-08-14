<script setup lang="ts">
import TheHeader from '~/components/header/TheHeader.vue'
import TheFooter from '~/components/footer/TheFooter.vue'
</script>

<template>
  <section class="main-section">
    <TheHeader></TheHeader>
    <main class="main-container">
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
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  padding: 1rem;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}
</style>
