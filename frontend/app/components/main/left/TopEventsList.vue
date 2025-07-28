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
</script>

<template>
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
</template>

<style scoped lang="scss">
.events-list {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  //flex-wrap: wrap;

  &__item {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    transition: all 0.2s;

    &:hover {
      color: $color-background-primary;
    }
  }

  &__img {
    display: block;
    max-width: 45px;
    object-fit: cover;
  }

  &__text {
    min-width: max-content;

    h3 {
      font-size: 14px;
    }

    span {
      font-size: 12px;
    }
  }
}
</style>
