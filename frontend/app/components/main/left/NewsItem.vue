<script setup lang="ts">
interface INewsItem {
  id: number
  title: string
  category: string
  tags: string[]
  image: string
  date: string
  comments: number
  views: number
}

const props = defineProps<{
  item: INewsItem
  typeView: 'list' | 'module'
}>()
</script>

<template>
  <div
    class="news-item p-3 shadow hover:shadow-md transition"
    :class="{
      'news-item--list': props.typeView === 'list',
      'news-item--module': props.typeView === 'module',
    }"
  >
    <div
      class="news-item__img-wrapper overflow-hidden rounded-md mb-3"
      :style="{
        height: props.typeView === 'list' ? '500px' : '192px',
      }"
    >
      <img
        :src="props.item.image"
        alt="news image"
        class="news-item__img w-full h-full object-cover transition-all duration-300"
      />
    </div>

    <div>
      <div class="news-item__data text-sm text-muted-foreground flex gap-2 mb-2">
        <span class="news-item__content">{{ props.item.date }}</span>
        <Icon name="mdi:circle-medium" />
        <span class="news-item__content">
          {{ props.item.views }}
          <Icon name="mdi:eye" />
        </span>
        <Icon name="mdi:circle-medium" />
        <span class="news-item__content">
          {{ props.item.comments }}
          <Icon name="mdi:comment" />
        </span>
      </div>

      <h3 class="news-item__title title">
        {{ props.item.title }}
      </h3>

      <div class="news-item__badges">
        <UBadge class="news-item__badges--cat" variant="solid">{{ props.item.category }}</UBadge>
        <UBadge v-for="tag in props.item.tags" :key="tag" variant="outline">
          {{ tag }}
        </UBadge>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news-item {
  background-color: $color-background-topics;
  border: 1px solid $color-background-topics-border;
  border-radius: 5px;

  &--list {
    width: 100%;
    margin: auto;
  }

  &--module {
    width: 100%;
  }

  &__title {
    margin-bottom: 1rem;
  }

  &__data {
    display: flex;
    align-items: center;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: $color-background-primary;
    }
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    border: 1px solid transparent;
  }
}
</style>
