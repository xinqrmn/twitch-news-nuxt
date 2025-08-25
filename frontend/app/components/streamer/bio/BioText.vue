<template>
  <div class="bio-grid">
    <!-- Основная информация -->
    <div class="main-content">
      <h3 class="title mb-4">Основная информация</h3>
      <div class="info-grid">
        <div class="info-item">
          <UIcon name="mdi:calendar" class="info-icon" />
          <span class="info-label">Дата рождения:</span>
          <span class="info-value">{{ bioData.birthDate }}</span>
        </div>
        <div class="info-item">
          <UIcon name="mdi:gamepad-variant" class="info-icon" />
          <span class="info-label">Основная игра:</span>
          <span class="info-value">{{ bioData.mainGame }}</span>
        </div>
        <div class="info-item">
          <UIcon name="mdi:map-marker" class="info-icon" />
          <span class="info-label">Страна:</span>
          <span class="info-value">{{ bioData.country }}</span>
        </div>
        <div class="info-item">
          <UIcon name="mdi:city-variant-outline" class="info-icon" />
          <span class="info-label">Город проживания:</span>
          <span class="info-value">Геленджик</span>
        </div>
        <div class="info-item">
          <UIcon name="mdi:weight-kilogram" class="info-icon" />
          <span class="info-label">Вес:</span>
          <span class="info-value">52 kg</span>
        </div>
        <div class="info-item">
          <UIcon name="mdi:human-male-height-variant" class="info-icon" />
          <span class="info-label">Рост:</span>
          <span class="info-value">192 см</span>
        </div>
      </div>
    </div>

    <!-- Описание -->
    <div v-if="bioData.description" class="main-content flex gap-14">
      <UCarousel
        v-slot="{ item }"
        :items="mockBio.images"
        arrows
        dots
        loop
        :autoplay="{ delay: 2000 }"
        class="w-1/3 mb-7"
      >
        <img :src="item" alt="dsad" class="block object-cover h-full rounded-[5px]" />
      </UCarousel>

      <div class="mb-4">
        <h3 class="title">О себе</h3>
        <p class="description">{{ bioData.description }}</p>
      </div>
    </div>

    <!-- Новости со стримерами -->
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
  </div>
</template>

<script setup lang="ts">
// import type { IStreamerBio } from '~/types/streamer/streamer'
//
// const props = defineProps<{
//   bio?: IStreamerBio
// }>()

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

const mockBio = {
  birthDate: '15 мая 1995',
  country: 'Россия',
  mainGame: 'Dota 2',
  description:
    'Профессиональный стример и киберспортсмен. Участвую в турнирах по Dota 2 с 2018 года. Люблю общаться с комьюнити и проводить образовательные стримы по геймплею.',
  images: [
    'https://img-cdn.hltv.org/playerbodyshot/aLlVFarOBI7XFJrPkxuMxN.png?ixlib=java-2.1.0&w=400&s=b60e7e640ca0b2f4ccf1f1affdec84d6',
    'https://i.pinimg.com/736x/0f/0a/5e/0f0a5e81f6469c3c4d6ab7299a715be0.jpg',
    'https://sun1-21.userapi.com/impg/qIzJdY4rUXYHXKv6lZEeaMjgtN1dxp4xb1Bhrw/WYvwk2JCXs4.jpg?size=604x604&quality=96&sign=67779f0a5db16c8bf1026381759b5e8c&type=album',
  ],
}

// const bioData = props.bio || mockBio
const bioData = mockBio
</script>

<style scoped lang="scss">
.bio-grid {
  display: grid;
  gap: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.75rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.info-icon {
  color: #6b7280;
  width: 1.25rem;
  height: 1.25rem;
}

.info-label {
  font-weight: 500;
  min-width: 140px;
}

.info-value {
  color: #374151;

  .dark & {
    color: #d1d5db;
  }
}

.description {
  color: #374151;
  line-height: 1.6;

  .dark & {
    color: #d1d5db;
  }
}

@media (max-width: 768px) {
  .schedule-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 640px) {
  .schedule-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .info-label {
    min-width: auto;
  }
}
</style>
