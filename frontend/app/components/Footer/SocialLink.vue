<template>
  <Button variant="outline" size="icon" as-child>
    <NuxtLink :to="props.link">
      <Icon
        :name="props.icon"
        :style="{ '--hover-color': hoverColor }"
        style="color: black"
        size="2em"
      />
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
</style>
