<template>
  <div>
    <StreamersTable></StreamersTable>
  </div>
</template>

<script setup lang="ts">
import StreamersTable from '~/components/streamers/StreamersTable.vue'
</script>

<style lang="scss">
.streamers {
  &__title {
    margin-bottom: 1rem;
  }
}
</style>
