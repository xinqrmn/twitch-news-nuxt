<script setup lang="ts">
const events = [
  {
    id: 1241234,
    imageSrc: '/images/events/betboom-logo.png',
    title: 'BB Poker Season 9',
    subTitle: '31/07/2025',
  },
  {
    id: 1241312,
    imageSrc: '/images/events/betboom-logo.png',
    title: 'BB StreamersBattle 19',
    subTitle: '22/08/2025',
  },
  {
    id: 1232451,
    imageSrc: '/images/events/89squad-logo.png',
    title: '89-хата 2025',
    subTitle: 'Coming soon',
  },
  {
    id: 1248756,
    imageSrc: '/images/events/winline-logo.webp',
    title: 'Slay 2025',
    subTitle: '01/09/2025',
  },
]

// Переменная для отслеживания состояния касания
const isTouched = ref(false)
</script>

<template>
  <div
    class="events-container"
    :class="{ 'events-container--touched': isTouched }"
    @touchstart="isTouched = true"
    @touchend="isTouched = false"
  >
    <ul class="events-list">
      <li v-for="event in events.slice(-3).reverse()" :key="event.id">
        <NuxtLink class="events-list__item" to="#">
          <img :src="event.imageSrc" :alt="event.title" class="events-list__img" />
          <div class="events-list__text">
            <h3>{{ event.title }}</h3>
            <span v-if="event.subTitle">{{ event.subTitle }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.events-container {
  width: 100%;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: 60px;
    position: relative;
    cursor: pointer;

    // Скрываем скроллбар
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    // При касании или наведении — активируем ручной скролл
    &:hover,
    &.events-container--touched {
      overflow-x: auto;
      touch-action: pan-x; // Разрешаем горизонтальный свайп

      .events-list {
        animation-play-state: paused !important;
        width: max-content;
        min-width: 100%;
        transform: none !important;
        padding-right: 2rem;
      }
    }
  }
}

.events-list {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;

  @media (max-width: 1024px) {
    animation: marquee 15s linear infinite;
    width: 100%;

    &__item {
      min-width: 220px;
      flex-shrink: 0;
    }
  }
}

.events-list__item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  transition: all 0.2s;

  &:hover {
    color: $color-primary;
  }
}

.events-list__img {
  display: block;
  max-width: 45px;
  object-fit: cover;
}

.events-list__text {
  min-width: max-content;

  h3 {
    font-size: 14px;
    margin: 0;
  }

  span {
    font-size: 12px;
    color: #666;
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - 2rem));
  }
}

@media (max-width: 1024px) {
  .events-container {
    contain: strict;

    .events-list {
      will-change: transform;
      backface-visibility: hidden;
    }
  }
}
</style>
