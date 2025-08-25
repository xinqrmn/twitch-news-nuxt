<template>
  <div class="main-content">
    <h3 class="title mb-4">Новости со стримером</h3>
    <div class="flex items-center gap-4 w-full">
      <NuxtLink v-for="item in news" :key="item.id" class="w-1/4 main-content--right" to="/">
        <img
          :src="'/' + item.image"
          :alt="item.image"
          class="block object-cover mb-2 max-h-[120px] w-full"
        />
        <div class="text-sm text-muted-foreground flex gap-2 mb-2 items-center">
          <span class="">{{ item.date }}</span>
          <Icon name="mdi:circle-medium" />
          <span class="flex items-center gap-2">
            {{ item.views }}
            <Icon name="mdi:eye" />
          </span>
          <Icon name="mdi:circle-medium" />
          <span class="flex items-center gap-2">
            {{ item.comments }}
            <Icon name="mdi:comment" />
          </span>
        </div>
        <h2 class="mb-2">{{ item.title }}</h2>
        <div class="flex items-center gap-2">
          <UBadge variant="solid">{{ item.category }}</UBadge>
          <UBadge v-for="tag in item.tags" :key="tag" variant="outline">
            {{ tag }}
          </UBadge>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const news = [
  {
    id: 4,
    title: 'Ibai побил мировой рекорд Twitch — 9.300.000 зрителей на «La Velada del Año V»',
    category: 'Новость',
    tags: ['Evelone'],
    image: 'images/news/news1.jpg',
    date: '22.07 в 15:00',
    comments: 12,
    views: 10,
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
  },
]
</script>

<style lang="scss" scoped></style>
