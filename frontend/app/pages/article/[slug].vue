<script setup lang="ts">
// import { useRoute } from 'vue-router'
import ArticleHeader from '~/components/article/ArticleHeader.vue'
import ArticleBody from '~/components/article/ArticleBody.vue'
import ArticleFooter from '~/components/article/ArticleFooter.vue'
import type { Article } from '~/types/article'

// const route = useRoute()
// const slug = route.params.slug as string

const article: Article = {
  title: 'Twitch ужесточает борьбу с накруткой просмотров',
  subtitle: 'Новые меры против искусственного завышения статистики каналов',
  coverImage: '/images/news/news1.jpg',
  createdAt: '2023-11-15T10:30:00Z',
  author: 'Алексей Иванов',
  badges: [
    { type: 'primary', text: 'Новость' },
    { type: 'secondary', text: 'Twitch' },
  ],
  tags: ['Twitch', 'Модерация', 'Политика'],
  content: `
## h2
### h3
#### h4
paragraph - text

1. *1s*
2. 2s
3. ==3s==
4. [4s](https://xcite-avto.ru/)

> sdasdcvxvuhdfsgvur
> sdafdxcvfcxbfdxzxc

  <button>zxc</button>

sa sdxzvczxvc

> This is another blockquote, slightly different.
> -- Author Name

* Пункт 1
* Пункт 2
* Пункт 3


- 🥛 Core: The core of Milkdown, which provides the plugin loading system with the editor concepts.
- 🧇 Plugins: A set of plugins that can be used to extend the functionalities of the editor.
- 🍮 Components: Some headless components that can be used to build your own editor.


In Milkdown, you can extend the editor in many ways:

| Feature      | Description                                          | Example                   |
| ------------ | ---------------------------------------------------- | ------------------------- |
| 🎨 Theme     | [Create your own theme with CSS](https://xcite-avto.ru/)                       | Nord, Dracula             |
| 🧩 Plugin    | Create your own plugin to extend the editor          | Search, Collab            |
| 📦 Component | Create your own component to build your own editor   | Slash Menu, Toolbar       |
| 📚 Syntax    | Create your own syntax to extend the markdown parser | Image with Caption, LaTex |

---

dscvdsvfdb
    `, 
  // blocks: [
  //   {
  //     type: 'p',
  //     content:
  //       'Twitch объявил о новых мерах по борьбе с накруткой просмотров на платформе. Эти изменения затронут как крупных стримеров, так и начинающих создателей контента.',
  //   },
  //   { type: 'h2', content: 'Новые алгоритмы обнаружения' },
  //   {
  //     type: 'p',
  //     content:
  //       'Компания внедрила улучшенные алгоритмы машинного обучения, которые способны выявлять подозрительную активность с высокой точностью.',
  //   },
  //   {
  //     type: 'img',
  //     content: '/images/news/news1.jpg',
  //     alt: 'Новые алгоритмы Twitch',
  //     caption: 'Визуализация работы новых алгоритмов',
  //   },
  //   { type: 'h3', content: 'Как это повлияет на стримеров' },
  //   {
  //     type: 'p',
  //     content: 'Стримеры, уличенные в накрутке, столкнутся с серьезными последствиями:',
  //   },
  //   { type: 'p', content: '— Временная приостановка монетизации' },
  //   { type: 'p', content: '— Удаление искусственных просмотров из статистики' },
  //   { type: 'p', content: '— Временная блокировка канала при повторных нарушениях' },
  //   { type: 'separator', content: '' },
  //   { type: 'h2', content: 'Реакция сообщества' },
  //   {
  //     type: 'p',
  //     content:
  //       'Многие стримеры положительно оценили новые меры, отмечая, что это поможет сделать платформу более честной и конкурентной.',
  //   },
  //   {
  //     type: 'blockquote',
  //     content:
  //       'Это важный шаг для обеспечения公平竞争 на платформе. Накрутка просмотров вредит всем честным создателям контента.',
  //     cite: 'Известный стример Ninja',
  //   },
  //   { type: 'a', content: 'Официальное заявление Twitch', href: 'https://blog.twitch.tv/ru/' },
  // ],
}

useHead({
  title: 'TwitchNews | ' + article.title,
})
</script>

<template>
  <section class="col-span-full">
    <ArticleHeader
      :title="article.title"
      :subtitle="article.subtitle"
      :cover-image="article.coverImage"
      :created-at="article.createdAt"
      :author="article.author"
      :badges="article.badges"
    />
    <ArticleBody :data="article.content" />
    <ArticleFooter :tags="article.tags" :author="article.author" :created-at="article.createdAt" />
  </section>
</template>

<style scoped lang="scss"></style>
