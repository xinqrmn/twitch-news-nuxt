<script setup lang="ts"></script>

<template>
  <div class="article-header relative overflow-hidden mb-10">
    <img src="/images/news/news1.jpg" class="object-cover w-full h-full block" alt="img" />
    <div class="overlay"></div>
    <h1 class="title">Twitch ужесточает борьбу с накруткой просмотров</h1>
  </div>
</template>

<style scoped lang="scss">
.article-header {
  width: 100%;
  border: 1px solid $color-background-topics-border;
  border-radius: 5px;
  max-height: 400px;

  h1 {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5rem;
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
    rgba($color-background-topics, 0.8) 50%,
    rgba($color-background-topics, 1) 100%
  );
}
</style>
