<template>
  <Button class="btn" variant="outline" size="icon" as-child>
    <NuxtLink :to="props.link">
      <Icon :name="props.icon" class="icon" />
    </NuxtLink>
  </Button>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string
  icon: string
  hoverColor?: string
}>()
</script>

<style lang="scss" scoped>
.iconify:hover {
  background-color: var(--hover-color);
}

.btn {
  transition: all 0.2s;

  &:hover {
    background-color: $color-background-primary;
    border: 1px solid $color-background-primary;
  }
}

.icon {
  width: 20px;
  height: 20px;
  color: #000;
  transition: fill 0.2s;
}
</style>
