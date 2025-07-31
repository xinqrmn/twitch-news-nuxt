<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type SelectedCat = 'recommended' | 'article' | 'news'

const emit = defineEmits<{
  (e: 'update:selectedCat', value: SelectedCat): void
}>()

const changeCat = (value: SelectedCat) => {
  emit('update:selectedCat', value)
}
</script>

<template>
  <Tabs default-value="recommended" @update:model-value="changeCat">
    <TabsList class="tabs">
      <TabsTrigger class="tabs__trigger" value="recommended"> Рекомендации </TabsTrigger>
      <TabsTrigger class="tabs__trigger" value="article"> Статьи </TabsTrigger>
      <TabsTrigger class="tabs__trigger" value="news"> Новости </TabsTrigger>
    </TabsList>
  </Tabs>
</template>

<style scoped lang="scss">
.tabs {
  gap: 1rem;
  background-color: transparent;

  &__trigger {
    color: #fff;
    cursor: pointer;

    &[data-state='active'] {
      background: $color-background-primary;
    }
  }
}

@media (max-width: 1024px) {
  .tabs{
    gap: 0.5rem;
  }

  [data-slot='tabs']{
    width: 100%;
    // justify-content: space-between;
  }
  [data-slot='tabs-list']{
    width: 100%;
    // justify-content: space-between;
  }
}
</style>
