<script setup lang="ts">
import AppTopbar from '@/layout/AppTopbar.vue'
import AppSidebar from '@/layout/AppSidebar.vue'
</script>

<template>
  <div class="bg-gray-50 dark:bg-surface-950 min-h-screen">
    <AppTopbar></AppTopbar>
    <AppSidebar></AppSidebar>
    <div class="ml-[22rem] pt-[6rem] pr-8 pl-8 min-h-screen">
      <router-view></router-view>
    </div>
  </div>
  <Toast
    :pt="{
      summary: 'font-bold',
      messageIcon: 'scale-[90%]',
    }"
  />
</template>

<style scoped lang="scss"></style>
