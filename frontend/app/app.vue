<template>
  <div class="bodyan">
    <NuxtRouteAnnouncer />

  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@/stores/counter'

const counter = useCounter()
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.bodyan {
  background: #636363;
  width: 100vw;
  height: 100vh;
}
</style>