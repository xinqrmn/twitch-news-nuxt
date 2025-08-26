<script setup lang="ts">
import BioText from '~/components/streamer/bio/BioText.vue'
import BioNews from './BioNews.vue'
</script>

<template>
  <div class="bio-grid">
    <BioText></BioText>
    <BioNews></BioNews>
  </div>
</template>

<style scoped lang="scss">
.bio-grid {
  display: grid;
  gap: 1rem;
}
</style>
