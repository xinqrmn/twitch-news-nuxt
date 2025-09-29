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
      { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/' },
    ],
  },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-briefcase',
    to: '/test',
    items: [
      {
        label: 'Landing',
        icon: 'pi pi-fw pi-globe',
        to: '/test1',
      },
      {
        label: 'Auth',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            to: '/test2',
          },
          {
            label: 'Error',
            icon: 'pi pi-fw pi-times-circle',
            to: '/test3',
          },
          {
            label: 'Access Denied',
            icon: 'pi pi-fw pi-lock',
            to: '/test4',
          },
        ],
      },
      {
        label: 'Crud',
        icon: 'pi pi-fw pi-pencil',
        to: '/test5',
      },
      {
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/test6',
      },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        to: '/test7',
      },
    ],
  },
  // {
  //   label: 'Hierarchy',
  //   items: [
  //     {
  //       label: 'Submenu 1',
  //       icon: 'pi pi-fw pi-bookmark',
  //       items: [
  //         {
  //           label: 'Submenu 1.1',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [
  //             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
  //             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
  //             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
  //           ],
  //         },
  //         {
  //           label: 'Submenu 1.2',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }],
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Submenu 2',
  //       icon: 'pi pi-fw pi-bookmark',
  //       items: [
  //         {
  //           label: 'Submenu 2.1',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [
  //             { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
  //             { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
  //           ],
  //         },
  //         {
  //           label: 'Submenu 2.2',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }],
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    label: 'Get Started',
    items: [
      {
        label: 'Documentation',
        icon: 'pi pi-fw pi-book',
        to: '/',
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
    <template v-for="item in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style scoped lang="scss"></style>
