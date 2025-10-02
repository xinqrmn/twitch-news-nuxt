<script setup lang="ts">
import { ref } from 'vue'
import AppMenuItem from '@/layout/AppMenuItem.vue'

const model = ref([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
  },
  {
    label: 'Main',
    items: [
      { label: 'Users', icon: 'pi pi-fw pi-users', to: '/users' },
      { label: 'Post List', icon: 'pi pi-fw pi-list', to: '/editor' },
      { label: 'Post Editor', icon: 'pi pi-fw pi-pen-to-square', to: '/editor' },
      { label: 'Streamers Table', icon: 'pi pi-fw pi-table', to: '/streamers' },
      { label: 'Streamers Editor', icon: 'pi pi-fw pi-twitch', to: '/streamers/editor', class: 'rotated-icon' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' },
    ],
  },
  {
    label: 'Get Started',
    items: [
      {
        label: 'Documentation',
        icon: 'pi pi-fw pi-book',
        to: '/doc',
      },
      {
        label: 'View Source',
        icon: 'pi pi-fw pi-github',
        url: 'https://github.com/xinqrmn/twitch-news-nuxt',
        target: '_blank',
      },
    ],
  },
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style scoped lang="scss"></style>
