<script setup lang="ts">
// import { useMockNews } from '@/composables/useMockNews'
import NewsItem from '@/components/main/left/NewsItem.vue'
import NewsFeedNavigation from '@/components/main/left/NewsFeedNavigation.vue'
import { computed } from 'vue'
import type { StrapiResponse, NewsPosts } from '~/types/strapi'
import { useRuntimeConfig } from '#app'

type SelectedCat = 'recommended' | 'article' | 'news'

// const news = useMockNews()
const { data, pending, error } = useFetch<StrapiResponse<NewsPosts>>('/api/news-posts', {
  baseURL: useRuntimeConfig().public.strapiBaseUrl,
  params: {
    fields: ['title', 'category', 'date', 'comments', 'views', 'tags'],
    populate: 'image',
  },
})
const news = computed(() => data.value?.data || [])
console.log(news)

const active = ref<'list' | 'module'>('list')
const selectedCat = ref<SelectedCat>('recommended')

const handleToggleActive = (str: 'list' | 'module') => {
  active.value = str
}

const filteredNews = computed(() => {
  return news.value.filter((item) => {
    if (selectedCat.value === 'recommended') {
      return item
    } else if (selectedCat.value === 'article') {
      return item.category === 'Статья'
    } else if (selectedCat.value === 'news') {
      return item.category === 'Новость'
    }
  })
})
</script>

<template>
  <div class="news-feed__navigation">
    <NewsFeedNavigation @update:selected-cat="selectedCat = $event"></NewsFeedNavigation>
    <div class="news-feed__box">
      <Icon
        class="news-feed__view"
        name="mdi:format-list-bulleted"
        :class="{ 'news-feed__view--active': active === 'list' }"
        @click="handleToggleActive('list')"
      />

      <Icon
        class="news-feed__view"
        name="mdi:view-grid"
        style="height: 18px; width: 18px"
        :class="{ 'news-feed__view--active': active === 'module' }"
        @click="handleToggleActive('module')"
      />
    </div>
  </div>
  <TransitionGroup
    name="fade"
    tag="div"
    class="news-feed__inner"
    :class="{
      'grid grid-cols-1': active === 'list',
      'grid md:grid-cols-2 xl:grid-cols-3': active === 'module',
    }"
  >
    <NewsItem v-for="item in filteredNews" :key="item.id" :item="item" :type-view="active" @click="console.log(item.documentId)"/>
  </TransitionGroup>
</template>

<style scoped lang="scss">
.news-feed {
  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $color-background-topics;
    border: 1px solid $color-background-topics-border;
    border-radius: 5px;
    padding: 0.2rem 1rem;
  }

  &__box {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  &__view {
    width: 22px;
    height: 22px;
    cursor: pointer;

    &--active {
      color: $color-background-primary;
    }
  }

  &__inner {
    gap: 1rem;

    &--list {
      .news-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: auto;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
