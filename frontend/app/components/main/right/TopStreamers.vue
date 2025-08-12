<script setup lang="ts">
import { Button } from '@/components/ui/button'
import TopStreamersTable from '@/components/main/right/TopStreamersTable.vue'

const props = defineProps<{ title: string }>()

const streamers = [
  { id: 123124312, name: 'evelone2004', points: 999 },
  { id: 123124318, name: 'bratishkinoff', points: 988 },
  { id: 123124346, name: 'nix', points: 966 },
  { id: 123124124, name: 'buster', points: 955 },
]

const squads = [
  { id: 123124512, name: '89 squad', points: 123 },
  { id: 123124118, name: 'Freak squad', points: 122 },
  { id: 123124446, name: 'EBLAN', points: 111 },
  { id: 123124714, name: 'Staya', points: 110 },
]
</script>

<template>
  <div class="main-content--right">
    <h2 class="title">Топ {{ props.title }}</h2>
    <TopStreamersTable
      :data="props.title === 'стримеров' ? streamers : squads"
      style="margin-bottom: 1rem"
    ></TopStreamersTable>
    <NuxtLink to="#">
      <Button class="btn" variant="outline">Полная таблица</Button>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.btn {
  width: 100%;
  cursor: pointer;
  background-color: $color-background-topics;

  &:hover {
    border-color: $color-background-main;
    background-color: $color-background-main;
    color: $color-background-primary;
  }
}
</style>
