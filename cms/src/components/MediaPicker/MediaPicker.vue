<script setup lang="ts">
import MediaDataView from './MediaDataView.vue'
</script>

<template>
  <Card class="p-4 w-[65rem] h-fit" :pt="{body: 'h-full', content: 'h-[450px]'}">
    <template #title>
      <h2>Выбор медиа</h2>
    </template>
    <template #content>
      <MediaDataView />
    </template>
  </Card>
</template>

<style scoped>

</style>