<template>
  <div class="streamers">
    <StreamersTable></StreamersTable>
  </div>
</template>

<script setup lang="ts">
import StreamersTable from '~/components/streamers/StreamersTable.vue'

useHead({
  title: 'TwitchNews | Стримеры',
})
</script>

<style lang="scss">
.streamers {
  grid-column: 1 / -1;
}
</style>
