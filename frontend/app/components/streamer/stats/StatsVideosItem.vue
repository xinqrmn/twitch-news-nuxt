<script setup lang="ts">
import type { IStreamerVideo } from '~/types/streamer'
import { secondsToTime, formatNumber } from '#imports'

const props = defineProps<{
  data: IStreamerVideo
}>()
</script>

<template>
  <div class="p-[.6rem]">
    <NuxtLink
      class="video"
      :to="`https://www.twitch.tv/videos/${props.data.videoId}`"
      target="_blank"
    >
      <div class="video-image">
        <div class="video-decor--triangle-left"></div>
        <div class="video-decor--triangle-bottom"></div>
        <div class="video-decor--left"></div>
        <div class="video-decor--bottom"></div>
        <div class="video-image--main">
          <img :src="props.data.imageUrl" :alt="props.data.title" />
          <UBadge color="neutral" variant="subtle" class="badge badge--top">
            <NuxtTime class="badge--time" :datetime="props.data.date" locale="ru-RU" />
          </UBadge>
          <div class="badge badge--bottom">
            <UBadge color="neutral" variant="subtle">
              {{ formatNumber(props.data.watches) }}
            </UBadge>
            <UBadge color="neutral" variant="subtle">
              {{ secondsToTime(props.data.duration) }}
            </UBadge>
          </div>
        </div>
      </div>

      <div class="video-title">
        <h3 :title="props.data.title">
          {{ props.data.title }}
        </h3>
        <h4>{{ props.data.category }}</h4>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.video {
  width: 20%;
  border-radius: 5px;
  transition: transform 0.2s ease;

  &-decor--left,
  &-decor--triangle-left {
    position: absolute;
    top: 0;
    transition-property: transform;
    transition-timing-function: ease;
    transition-duration: 0.1s;
  }

  &-decor--left {
    left: 0;
    bottom: 0;
    width: 0.4rem;
    height: 100%;
    transform-origin: 0 100%;
    background-color: var(--color-twitch-400);
    transform: scaleX(0);
  }

  &-decor--triangle-left {
    left: 0;
    width: 0;
    height: 0;
    transform-origin: left center;
    border-top: 0.4rem solid transparent;
    border-bottom: 0.4rem solid transparent;
    border-right: 0.4rem solid var(--color-twitch-400);
    transform: translateY(-0.4rem) scale(0);
  }

  &-decor--bottom,
  &-decor--triangle-bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    transition-property: transform;
    transition-timing-function: ease;
    transition-duration: 0.1s;
  }

  &-decor--bottom {
    left: 0;
    height: 0.4rem;
    transform-origin: 0 100%;
    background-color: var(--color-twitch-400);
    transform: scaleY(0);
  }

  &-decor--triangle-bottom {
    width: 0;
    height: 0;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
    border-top: 0.4rem solid var(--color-twitch-400);
    transform-origin: center bottom;
    transform: translateX(-0.4rem) scale(0);
  }

  &-image {
    min-height: 120px;
    position: relative;

    &:hover {
      .video-image--main {
        transform: translate3d(0.4rem, -0.4rem, 0) scale(1.01);
        transition-delay: 75ms;
      }

      .video-decor--left {
        transform: scaleX(1);
        transition-delay: 75ms;
      }

      .video-decor--triangle-left {
        transform: translateY(-0.4rem) scale(1);
        transition-delay: 75ms;
      }

      .video-decor--bottom {
        transform: scaleY(1);
        transition-delay: 75ms;
      }

      .video-decor--triangle-bottom {
        transform: translateX(0.4rem) scale(1);
        transition-delay: 75ms;
      }
    }

    &--main {
      position: relative;
      width: 100%;
      min-height: 120px;
      overflow: hidden;
      transition-property: transform;
      transition-timing-function: ease;
      transition-duration: 0.1s;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 111;
      }
    }

    .badge {
      position: absolute;
      margin: 0.5rem;
      left: 0;
      transition: all 0.3s;
      z-index: 111;
    }

    .badge--top {
      top: 0;
    }

    .badge--bottom {
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
    }

    .badge--top,
    .badge--time time,
    .badge span {
      font-size: 0.6rem;
      background: rgba($color-background-topics, 0.7);
    }
  }
  .video-title {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    h3 {
      color: #fff;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h4 {
      font-size: 0.75rem;
      color: #777;
    }
  }
}
</style>
