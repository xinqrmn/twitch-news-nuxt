<script setup lang="ts">
const topicItems = [
  { id: 1231238, time: '12:00', src: '/images/twitch.svg', title: 'Крупный турнир по Dota 2 стартует сегодня' },
  { id: 1231675, time: '12:10', src: '/images/kick.svg', title: 'Казино Stake подписали мелстроя' },
  { id: 1231123, time: '12:20', src: '/images/kick.svg', title: 'Kick раздаёт деньги' },
  { id: 2346345, time: '12:30', src: '/images/twitch.svg', title: 'Кукинг Эвелона с Генсухой' },
  { id: 4456856, time: '12:40', src: '/images/kick.svg', title: 'На Kick добавили жёсткие правила для стримеров' },
  { id: 7895673, time: '12:50', src: '/images/w.svg', title: 'Стримеры массово переходят в W.tv' },
  { id: 2367831, time: '13:00', src: '/images/twitch.svg', title: 'Твич хотят запретить в рф' },
]
</script>

<template>
  <div class="hot-topics main-content">
    <h2 class="hot-topics__title title">Главные новости</h2>
    <ul class="hot-topics__list">
      <NuxtLink
        v-for="topic in topicItems.slice(-5).reverse()"
        :key="topic.id"
        to="#"
        class="hot-topics__link"
      >
        <li class="hot-topics__item">
          <img :src="topic.src" alt="twitch icon" class="hot-topics__item-logo" />
          <p class="hot-topics__item-time">{{ topic.time }}</p>
          <h3 class="hot-topics__item-title">{{ topic.title }}</h3>
        </li>
      </NuxtLink>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.hot-topics {
  &__title {
    margin-bottom: 1rem;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 1rem;

    &-logo {
      width: 16px;
      height: 16px;
    }
  }

  &__link {
    display: block;

    &:not(:last-child) {
      margin-bottom: 0.7rem;
    }
  }
  @media (max-width: 1024px) {
    &__title {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
