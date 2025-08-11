<script setup lang="ts">
import TheHeader from '~/components/header/TheHeader.vue'
import TheFooter from '~/components/footer/TheFooter.vue'
</script>

<template>
  <section class="main-section">
    <TheHeader></TheHeader>
    <main class="main-container">
      <slot />
    </main>
    <TheFooter></TheFooter>
  </section>
</template>

<style scoped lang="scss"></style>
