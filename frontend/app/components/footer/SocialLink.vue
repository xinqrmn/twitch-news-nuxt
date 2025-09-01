<template>
  <UButton
    class="btn"
    variant="solid"
    size="lg"
    color="primary"
    :icon="props.icon"
    :to="props.link"
    target="_blank"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string
  icon: string
  hoverColor?: string
}>()
</script>

<style lang="scss" scoped></style>
