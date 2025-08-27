<script setup lang="ts">
import markdownit from 'markdown-it'
// interface ArticleBlock {
//   type: 'h2' | 'h3' | 'p' | 'img' | 'blockquote' | 'a' | 'separator'
//   content: string
//   alt?: string
//   caption?: string
//   cite?: string
//   href?: string
// }

const md = new markdownit({
  html: true, // разрешаем html внутри md
  linkify: true, // автоматом преобразует ссылки
  typographer: true, // красивые кавычки и тире
})

const props = defineProps<{
  // blocks: ArticleBlock[]
  data: string
}>()

const rendered = computed(() => (props.data ? md.render(props.data) : ''))
</script>

<template>
  <div
    class="prose
    prose-headings:text-white
    text-white 
      max-w-4/5 m-auto 
      w-full 
      prose-a:text-white prose-a:hover:text-twitch-400
      prose-blockquote:text-twitch-400 prose-blockquote:text-lg prose-blockquote:border-l-twitch-400
      prose-li:marker:text-twitch-400
      "
    v-html="rendered"
  ></div>
</template>

<style scoped lang="scss">
.article-body {
  margin-bottom: 3rem;
}

.content-container {
  max-width: 80%;
  margin: 0 auto;
  padding: 0 1rem;
}

.content-block {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.heading-2 {
  font-size: 1.875rem;
  font-weight: 600;
  margin: 2.5rem 0 1rem;
  color: $color-primary;
  line-height: 1.3;
}

.heading-3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  color: $color-primary;
  line-height: 1.3;
}

.paragraph {
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
}

.image-wrapper {
  margin: 2rem 0;
  text-align: center;
}

.article-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.image-caption {
  font-size: 0.9rem;
  margin-top: 0.75rem;
  font-style: italic;
}

.quote {
  border-left: 4px solid $color-primary;
  padding: 1rem 0 1rem 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  background-color: rgba($color-primary, 0.05);
  border-radius: 0 8px 8px 0;
}

.quote-cite {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.link-wrapper {
  margin: 1.5rem 0;
}

.article-link {
  color: $color-primary;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;

  &:hover {
    border-bottom-color: $color-primary;
  }
}

.separator {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    $color-background-topics-border 50%,
    transparent 100%
  );
  margin: 2.5rem 0;
}

@media (max-width: 768px) {
  .content-container {
    padding: 0 0.5rem;
  }

  .heading-2 {
    font-size: 1.5rem;
    margin: 2rem 0 0.75rem;
  }

  .heading-3 {
    font-size: 1.25rem;
    margin: 1.5rem 0 0.5rem;
  }

  .paragraph {
    font-size: 1rem;
  }

  .separator {
    margin: 2rem 0;
  }
}
</style>
