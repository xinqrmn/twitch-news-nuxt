<script setup lang="ts">
const props = defineProps<{
  accentColor: string | string[]
  title: string
  logo: string
  url: string
}>()
</script>

<template>
  <NuxtLink class="btn-container" :to="props.url" target="_blank">
    <img class="relative z-10 max-w-[100px]" :src="props.logo" :alt="props.logo" />
    <span class="btn">{{ props.title }}</span>
    <div class="btn-overlay" :style="{ background: props.accentColor }"></div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.btn {
  font-size: 1.2rem;
  transform: skewX(0);
  position: relative;
  z-index: 11;

  &-container {
    padding: 2rem 1rem;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-overlay {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: skewX(-20deg);
    z-index: 1;
  }
}
</style>
