<script setup lang="ts">
import MediaDataView from './MediaDataView.vue'
</script>

<template>
  <Card class="p-4 w-[65rem] h-fit" :pt="{ body: 'h-full', content: 'h-[450px]' }">
    <template #title>
      <h2>Выбор медиа</h2>
    </template>
    <template #content>
      <MediaDataView
        :items="[
          'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/0c7111bb-b275-4c46-9763-35a253a171a4-gandonio-_uebische.jpg',
          'https://db54213d-bfae-48a3-ae98-9605dab54e42.selstorage.ru/7469b216-9dff-4e2b-a32e-1c7372576fb7-gandonio-_uebische.jpg',
        ]"
      />
    </template>
  </Card>
</template>

<style scoped></style>
