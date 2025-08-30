<script setup lang="ts">
import markdownit from 'markdown-it'
// import PromoButton from '~/components/article/PromoButton.vue'
// interface ArticleBlock {
//   type: 'h2' | 'h3' | 'p' | 'img' | 'blockquote' | 'a' | 'separator'
//   content: string
//   alt?: string
//   caption?: string
//   cite?: string
//   href?: string
// }

const items = [
  'https://avatars.mds.yandex.net/i?id=130498fcea06062435a9a636b8cd9b4e_l-5644946-images-thumbs&n=13',
  'https://avatars.mds.yandex.net/i?id=966354b41d1bdca216b4705e31a0f2ae_l-10752166-images-thumbs&n=13',
  'https://wallsdesk.com/wp-content/uploads/2016/12/Pictures-of-Manhattan-Bridge.jpg',
  'https://avatars.mds.yandex.net/i?id=c472dfb2ff9a2c0ca894f459a06f8966_l-5419733-images-thumbs&n=13',
  'https://sun9-45.userapi.com/4iwAiEXMOkRfXF2IqxOwUE6J4VOaSmqdKYIc3Q/vX1Uk9DZO1g.jpg',
  'https://wallpapers.com/images/hd/beautiful-sunset-pictures-ubxtuvfhpoampb6d.jpg',
]

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}

function onClickNext() {
  activeIndex.value++
}

function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index

  carousel.value?.emblaApi?.scrollTo(index)
}

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
  <div class="max-w-4/5 m-auto w-full mb-4 flex flex-col gap-4 col-span-full">
    <div
      class="prose max-w-full prose-headings:text-white text-white prose-a:text-white prose-a:hover:text-twitch-400 prose-blockquote:text-twitch-400 prose-blockquote:text-lg prose-blockquote:border-l-twitch-400 prose-li:marker:text-twitch-400"
      style="width: 100%"
      v-html="rendered"
    ></div>

    <!--    <PromoButton accent-color="#FFA500" title="Залутать фрибетик" logo="/images/events/winline-logo.png" url="https://winline.ru/"></PromoButton>-->

    <UButton class="mr-auto" trailing-icon="mdi:arrow-right">Узнать больше</UButton>
    <UButton class="m-auto" variant="outline" trailing-icon="mdi:arrow-right"
      >Узнать больше
    </UButton>
    <UButton class="ml-auto" variant="link" trailing-icon="mdi:arrow-right">Узнать больше</UButton>

    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      arrows
      :items="items"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="w-full"
      @select="onSelect"
    >
      <img
        :src="item"
        class="w-full block object-cover max-h-[500px] h-full rounded-[5px]"
        alt="test"
      />
    </UCarousel>
    <div class="flex justify-center gap-4 overflow-x-auto max-w-[90dvw] w-full">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex-shrink-0 w-16 h-12 opacity-25 hover:opacity-100 transition-opacity rounded-lg"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="select(index)"
      >
        <img :src="item" class="block object-cover w-full h-full rounded-lg" alt="test" />
      </div>
    </div>

    <video class="w-full" controls>
      <source src="/videos/big-test.mp4" type="video/mp4" />
    </video>
  </div>
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
