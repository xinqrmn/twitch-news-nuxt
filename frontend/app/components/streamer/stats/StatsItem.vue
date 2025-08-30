<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
  data: number | undefined
}>()
</script>

<template>
  <div class="stats main-content--right">
    <UIcon :name="props.icon" color="primary" class="size-8" />
    <span class="stats__title font-semibold">{{ props.title }}</span>
    <span class="stats__value">{{ props.data }}</span>
  </div>
</template>

<style scoped lang="scss">
.stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  @media (max-width: 768px) {
    text-align: center;
    justify-content: space-between;
  }
  svg {
    color: $color-primary;
  }
}
</style>
