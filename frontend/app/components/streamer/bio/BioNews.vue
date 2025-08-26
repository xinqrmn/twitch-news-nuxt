<template>
  <div class="main-content">
    <h3 class="title mb-4">Новости со стримером</h3>
    <div class="flex items-center gap-4 w-full">
      <BioNewsItem v-for="(item, index) in news" :key="item.id + index" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBioNewsItem } from '~/types/streamer'
import BioNewsItem from './BioNewsItem.vue'

const news: IBioNewsItem[] = [
  {
    id: 4,
    title: 'Ibai побил мировой рекорд Twitch — 9.300.000 зрителей на «La Velada del Año V»',
    category: 'Новость',
    tags: ['Evelone'],
    image: 'images/news/news1.jpg',
    date: '22.07 в 15:00',
    comments: 12,
    views: 10,
    link: '/',
  },
  {
    id: 5,
    title: 'Ibai побил мировой рекорд Twitch — 9.300.000 зрителей на «La Velada del Año V»',
    category: 'Новость',
    tags: ['CS2', 'Evelone'],
    image: 'images/news/news2.jpg',
    date: '21.07 в 15:00',
    comments: 12,
    views: 10,
    link: '/',
  },
  {
    id: 6,
    title: 'Ibai побил мировой рекорд Twitch — 9.300.000 зрителей на «La Velada del Año V»',
    category: 'Статья',
    tags: ['Dota', 'Evelone'],
    image: 'images/news/news3.jpg',
    date: '26.07 в 15:00',
    comments: 12,
    views: 10,
    link: '/',
  },
  {
    id: 7,
    title: 'Ibai побил мировой рекорд Twitch — 9.300.000 зрителей на «La Velada del Año V»',
    category: 'Новость',
    tags: ['CS2', 'Evelone'],
    image: 'images/news/news4.jpg',
    date: '29.07 в 15:00',
    comments: 12,
    views: 10,
    link: '/',
  },
]
</script>

<style lang="scss" scoped></style>
