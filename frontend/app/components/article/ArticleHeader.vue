<script setup lang="ts">
interface Badge {
  type: string
  text: string
}

defineProps<{
  title: string
  subtitle?: string
  coverImage: string
  createdAt: string
  author: string
  badges: Badge[]
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="article-header relative overflow-hidden mb-6">
    <img :src="coverImage" :alt="title" />
    <div class="overlay"></div>

    <div class="header-content">
      <h1 class="article-title">{{ title }}</h1>

      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>

      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <UBadge
            v-for="(badge, index) in badges"
            :key="index"
            :variant="badge.type === 'primary' ? 'solid' : 'outline'"
            size="lg"
          >
            {{ badge.text }}
          </UBadge>
        </div>

        <div class="flex gap-4">
          <span>{{ formatDate(createdAt) }}</span>
          <span>Автор: {{ author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-header {
  width: 100%;
  border-radius: 8px;
  max-height: 500px;
  position: relative;

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba($color-background-topics, 0.2) 0%,
    rgba($color-background-topics, 0.6) 50%,
    rgba($color-background-topics, 0.9) 100%
  );
}

.header-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: white;
  z-index: 2;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .article-header {
    max-height: 400px;

    img {
      height: 400px;
    }
  }

  .header-content {
    padding: 1.5rem;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }
}
</style>
