<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref([
  {
    label: 'Новости',
    to: '/',
  },
  {
    label: 'Стримеры',
    to: '/streamers',
  },
] satisfies NavigationMenuItem[])

const props = defineProps<{
  isMobile?: boolean
}>()
</script>

<template>
  <UNavigationMenu
    :items="items"
    class="w-full"
    variant="link"
    :orientation="props.isMobile ? 'vertical' : 'horizontal'"
  ></UNavigationMenu>
</template>

<style scoped lang="scss"></style>
