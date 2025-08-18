<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { useGlobals } from '~/stores/globals';

const globals = useGlobals()
const items = [
  {
    label: 'Рекомендации',
    value: 'recommended',
    icon: 'material-symbols:recommend-outline-sharp',
  },
  {
    label: 'Статьи',
    value: 'article',
    icon: 'material-symbols:article-outline-rounded',
  },
  {
    label: 'Новости',
    value: 'news',
    icon: 'material-symbols:newspaper',
  },
] satisfies TabsItem[]

type SelectedCat = 'recommended' | 'article' | 'news'

const emit = defineEmits<{
  (e: 'update:selectedCat', value: SelectedCat): void
}>()

const changeCat = (value: SelectedCat) => {
  console.log(value)
  emit('update:selectedCat', value)
}
</script>

<template>
  <UTabs
    :items="items"
    variant="link"
    class="gap-0 nav"
    :class="{'w-full': globals.isMobile}"
    default-value="recommended"
    @update:model-value="changeCat"
  ></UTabs>
</template>

<style scoped lang="scss">
.nav {
  --ui-bg-elevated: transparent;

  button {
    outline: none;
  }
}
</style>
