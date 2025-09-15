<script setup lang="ts">
import { useApiToasts } from './composables/useApiToasts'

// Initialize API error toasts
useApiToasts()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
