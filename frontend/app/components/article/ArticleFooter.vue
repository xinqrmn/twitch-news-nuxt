<script setup lang="ts">
import type { Comment } from '~/types/article'

defineProps<{
  tags: string[]
  author: string
  createdAt: string
}>()

const comments: Comment[] = [
  {
    id: 1,
    author: 'Мария Смирнова',
    avatar: '/images/streamers/buster.png',
    content: 'Наконец-то! Это давно назрело. Надеюсь, это улучшит качество контента на платформе.',
    createdAt: '2023-11-15T14:30:00Z',
    likes: 24,
    isLiked: false,
    replies: [
      {
        id: 2,
        author: 'Иван Петров',
        avatar: '/images/streamers/bratishkinoff.png',
        content: 'Полностью согласен! Особенно радует, что крупные стримеры тоже под прицелом.',
        createdAt: '2023-11-15T15:45:00Z',
        likes: 8,
        isLiked: false,
      },
    ],
  },
  {
    id: 3,
    author: 'Алексей Козлов',
    avatar: '/images/streamers/89squad.png',
    content:
      'Интересно, как это повлияет на рекламные кампании. Многие бренды ориентировались на цифры, а не на реальную аудиторию.',
    createdAt: '2023-11-16T09:15:00Z',
    likes: 12,
    isLiked: true,
  },
]

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const newComment = ref('')

const addComment = () => {
  if (newComment.value.trim()) {
    comments.unshift({
      id: Date.now(),
      author: 'Вы',
      avatar: '/images/streamers/89squad.png',
      content: newComment.value,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    })
    newComment.value = ''
  }
}
</script>

<template>
  <div class="article-footer">
    <div class="mb-8 flex justify-between">
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="(tag, index) in tags" :key="index" variant="outline" size="lg">
          {{ tag }}
        </UBadge>
      </div>
      <span class="flex items-center gap-1 text-gray-500">
        <UIcon name="mdi:eye-outline" class="size-5" />
        {{ 1825 }}
      </span>
    </div>

    <!-- Комментарии -->
    <div>
      <h3 class="section-title">Комментарии ({{ comments.length }})</h3>

      <!-- Форма добавления комментария -->
      <div class="mb-4">
        <UTextarea
          v-model="newComment"
          class="w-full mb-4"
          highlight
          variant="ghost"
          :maxrows="3"
          placeholder="Оставьте ваш комментарий..."
        />
        <UButton :disabled="!newComment.trim()" @click="addComment"> Отправить</UButton>
      </div>

      <USeparator class="mb-4" />

      <!-- Список комментариев -->
      <div class="flex flex-col gap-4">
        <div v-for="comment in comments" :key="comment.id" class="flex gap-4">
          <div class="comment-avatar">
            <img :src="comment.avatar" :alt="comment.author" />
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-center mb-1">
              <span class="text-twitch-400">{{ comment.author }}</span>
              <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="mb-2">{{ comment.content }}</p>
            <div class="flex gap-2">
              <UButton
                color="neutral"
                variant="ghost"
                size="sm"
                icon="mdi:heart"
                class=""
                :class="{ 'text-red-400': comment.isLiked }"
              >
                {{ comment.likes }}
              </UButton>
              <UButton color="neutral" variant="ghost" size="sm" icon="mdi:reply" class="">
                Ответить
              </UButton>
            </div>

            <!-- Ответы на комментарий -->
            <div v-if="comment.replies && comment.replies.length" class="comment-replies">
              <div
                v-for="reply in comment.replies"
                :key="reply.id"
                class="flex gap-4 mt-4 pl-4 border-l-2 border-l-twitch-400"
              >
                <div class="comment-avatar">
                  <img :src="reply.avatar" :alt="reply.author" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-twitch-400">{{ reply.author }}</span>
                    <span class="text-xs text-gray-500">{{ formatDate(reply.createdAt) }}</span>
                  </div>
                  <p class="mb-2">{{ reply.content }}</p>
                  <div class="flex gap-2">
                    <UButton
                      color="neutral"
                      variant="ghost"
                      size="sm"
                      icon="mdi:heart"
                      class=""
                      :class="{ 'text-red-400': reply.isLiked }"
                    >
                      {{ reply.likes }}
                    </UButton>
                    <UButton color="neutral" variant="ghost" size="sm" icon="mdi:reply" class="">
                      Ответить
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-footer {
  max-width: 80%;
  margin: 0 auto;
  padding-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: $color-text-main;
  border-bottom: 2px solid $color-primary;
  display: inline-block;
}

.comment-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (max-width: 768px) {
  .article-footer {
    padding: 0 0.5rem;
  }

  .author-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .comment-actions {
    flex-wrap: wrap;
  }
}
</style>
