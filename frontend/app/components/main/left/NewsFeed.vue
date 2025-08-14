<script setup lang="ts">
import { useMockNews } from '@/composables/useMockNews'
import NewsItem from '@/components/main/left/NewsItem.vue'
import NewsFeedNavigation from '@/components/main/left/NewsFeedNavigation.vue'
import { computed } from 'vue'
import type { TabsItem } from '@nuxt/ui'
import { useGlobals } from '~/stores/globals'

const globals = useGlobals()

const items = [
  {
    label: '',
    value: 'list',
    icon: 'mdi:format-list-bulleted',
  },
  {
    label: '',
    value: 'module',
    icon: 'mdi:view-grid',
  },
] satisfies TabsItem[]

type SelectedCat = 'recommended' | 'article' | 'news'

const news = useMockNews()
const active = ref<'list' | 'module'>('list')
const selectedCat = ref<SelectedCat>('recommended')
const handleToggleActive = (str: 'list' | 'module') => {
  active.value = str
}

const filteredNews = computed(() => {
  return news.filter((item) => {
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
  <div class="news-feed__navigation main-content">
    <NewsFeedNavigation @update:selected-cat="selectedCat = $event"></NewsFeedNavigation>
    <UTabs
      v-if="!globals.isMobile"
      :items="items"
      class="gap-0 nav"
      default-value="list"
      @update:model-value="handleToggleActive"
    ></UTabs>
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
    <NewsItem v-for="item in filteredNews" :key="item.id" :item="item" :type-view="active" />
  </TransitionGroup>
</template>

<style scoped lang="scss">
.nav {
  --ui-bg-elevated: transparent;

  button {
    outline: none;
  }
}

.news-feed {
  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 1rem;
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

  @media (max-width: 1024px) {
    &__navigation {
      padding: 0.2rem 0.5rem;
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
