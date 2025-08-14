<script setup lang="ts">
import TopStreamersTable from '@/components/main/right/TopStreamersTable.vue'

const props = defineProps<{ title: string }>()

const getImageSrc = function(name: string): string {
  return `/images/streamers/${name.toLowerCase().replaceAll(' ', '')}.png`
}

const streamers = [
  { position: 1, id: 123124312, name: 'evelone2004', points: 999, image: getImageSrc('evelone2004') },
  { position: 2, id: 123124318, name: 'bratishkinoff', points: 988, image: getImageSrc('bratishkinoff') },
  { position: 3, id: 123124346, name: 'nix', points: 966, image: getImageSrc('nix') },
  { position: 4, id: 123124124, name: 'buster', points: 955, image: getImageSrc('buster') },
]

const squads = [
  { position: 1, id: 123124512, name: '89 squad', points: 123, image: getImageSrc('89 squad')  },
  { position: 2, id: 123124118, name: 'Freak squad', points: 122, image: getImageSrc('Freak squad') },
  { position: 3, id: 123124446, name: 'EBLAN', points: 111, image: getImageSrc('EBLAN') },
  { position: 4, id: 123124714, name: 'Staya', points: 110, image: getImageSrc('Staya') },
]
</script>

<template>
  <div class="main-content--right">
    <h2 class="title">Топ {{ props.title }}</h2>
    <TopStreamersTable
      :data="props.title === 'стримеров' ? streamers : squads"
      style="margin-bottom: 1rem"
    ></TopStreamersTable>
    <UButton to="/streamers" class="w-full justify-center" variant="ghost">Полная таблица</UButton>
  </div>
</template>

<style scoped lang="scss"></style>
