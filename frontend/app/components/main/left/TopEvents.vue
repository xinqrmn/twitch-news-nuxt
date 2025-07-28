<script setup lang="ts">
import TopEventsList from '@/components/main/left/TopEventsList.vue'
</script>

<template>
  <div class="top-events">
    <h2 class="top-events__title title">Top Events</h2>
    <TopEventsList></TopEventsList>
  </div>
</template>

<style scoped lang="scss">
.top-events {
  max-height: 5rem;
  width: 100%;
  background-color: $color-background-topics;
  border: 1px solid $color-background-primary;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;

  &__title {
    height: 100%;
    min-width: max-content;
    background: $color-background-primary;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>