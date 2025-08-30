<template>
  <div class="bio-info">
    <div class="bio-slider main-content--right">
      <UCarousel
        v-slot="{ item }"
        :items="mockBio.images"
        arrows
        dots
        loop
        :autoplay="{ delay: 5000 }"
        class="w-full"
        :ui="{
          container: 'transition-[height]',
          controls: 'absolute -bottom-8 inset-x-12',
          dots: '-top-7',
          dot: 'w-6 h-1 data-[state=active]:bg-twitch-400',
          prev: 'h-fit rounded-[5px] bg-twitch-400',
          next: 'h-fit rounded-[5px] bg-twitch-400',
        }"
      >
        <img :src="item" alt="dsad" class="block object-cover h-full w-full rounded-[5px] mb-4 md:mb-0" />
      </UCarousel>
    </div>
    <!-- Основная информация -->
    <div class="main-content">
      <h3 class="title mb-4">Основная информация</h3>
      <div class="info-grid">
        <BioInfo
          v-for="(item, index) in mockBio.info"
          :key="mockBio.info[index]!.type"
          :data="item"
        ></BioInfo>
      </div>
    </div>

    <div v-if="bioData.description" class="main-content flex gap-14 h-[180px] overflow-hidden">
      <div class="mb-4">
        <h3 class="title">О себе</h3>
        <p class="description max-h-full overflow-y-auto">{{ bioData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BioInfo from './BioInfo.vue'
// import type { IStreamerBio } from '~/types/streamer/streamer'
//
// const props = defineProps<{
//   bio?: IStreamerBio
// }>()

const mockBio = {
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, accusamus! Hic velit dolore beatae animi reprehenderit, dolorem a vel veniam nemo commodi cumque, perferendis eum ab magnam. At, iusto vel!
    Libero unde tempore, corporis alias temporibus adipisci aspernatur mollitia, perspiciatis excepturi quia maiores velit voluptatem quam eum, eveniet sunt dolor laudantium sint error! Saepe tempora consectetur ab perferendis itaque reiciendis.
    Ea harum similique culpa, officia in quam modi cumque architecto nesciunt, beatae eligendi at, provident odit consequuntur debitis libero. Nihil sunt vel sint voluptatem tempore facilis pariatur! Ducimus, illo dolore.
    Rem, ipsam dolorem distinctio ipsum incidunt ad quas asperiores voluptatem rerum consequatur. Adipisci aut doloremque dignissimos reiciendis maiores eos, voluptates asperiores quibusdam minima doloribus saepe inventore provident, eius voluptatum voluptas!
    Doloremque perferendis repudiandae laboriosam amet quo ut quaerat animi nulla, nostrum, cupiditate ipsam nesciunt soluta iusto? Ratione aut accusamus corrupti neque cum eius suscipit itaque ex iusto doloremque. Amet, est.`,
  images: [
    'https://img-cdn.hltv.org/playerbodyshot/aLlVFarOBI7XFJrPkxuMxN.png?ixlib=java-2.1.0&w=400&s=b60e7e640ca0b2f4ccf1f1affdec84d6',
    'https://i.pinimg.com/736x/0f/0a/5e/0f0a5e81f6469c3c4d6ab7299a715be0.jpg',
    'https://sun1-21.userapi.com/impg/qIzJdY4rUXYHXKv6lZEeaMjgtN1dxp4xb1Bhrw/WYvwk2JCXs4.jpg?size=604x604&quality=96&sign=67779f0a5db16c8bf1026381759b5e8c&type=album',
  ],
  info: [
    {
      type: 'birthday',
      payload: '15 мая 1995',
    },
    {
      type: 'country',
      payload: 'Сербия',
    },
    {
      type: 'game',
      payload: 'Dota 2',
    },
    {
      type: 'city',
      payload: 'Белград',
    },
    {
      type: 'weight',
      payload: '78 кг',
    },
    {
      type: 'height',
      payload: '186 см',
    },
  ],
}

// const bioData = props.bio || mockBio
const bioData = mockBio
</script>

<style scoped lang="scss">
.bio-info {
  display: grid;
  grid-template-columns: 300px 1fr;
  // grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
    @media (max-width: 768px) {
    grid-template-columns: 1fr; // одна колонка
    grid-template-rows: auto; // высота под контент
  }
}

.bio-slider {
  grid-row: 1/3;
  justify-items: center;
  // align-content: center;
    @media (max-width: 768px) {
    grid-row: auto; // автоматический ряд в одной колонке
    justify-self: center;
    :deep(div[role=tablist]) {
      position: relative;
    }
    :deep(button[aria-label=Next]){
      display: none;
    }
    :deep(button[aria-label=Prev]){
      display: none;
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.75rem;
}

.description {
  color: #374151;
  line-height: 1.6;

  .dark & {
    color: #d1d5db;
  }
}

@media (max-width: 768px) {
  .schedule-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 640px) {
  .schedule-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .info-label {
    min-width: auto;
  }
}
</style>
