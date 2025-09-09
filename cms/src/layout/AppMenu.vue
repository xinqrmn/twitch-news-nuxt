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
      { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/' },
      { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/', class: 'rotated-icon' },
      { label: 'Table', icon: 'pi pi-fw pi-table', to: '/' },
      { label: 'List', icon: 'pi pi-fw pi-list', to: '/' },
      { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/' },
      { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/' },
      { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/' },
      { label: 'Media', icon: 'pi pi-fw pi-image', to: '/' },
      { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/' },
      { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/' },
      { label: 'File', icon: 'pi pi-fw pi-file', to: '/' },
      { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/' },
      { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/' },
      { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/' },
    ],
  },
  {
    label: 'Pages',
    icon: 'pi pi-fw pi-briefcase',
    to: '/',
    items: [
      {
        label: 'Landing',
        icon: 'pi pi-fw pi-globe',
        to: '/',
      },
      {
        label: 'Auth',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            to: '/',
          },
          {
            label: 'Error',
            icon: 'pi pi-fw pi-times-circle',
            to: '/',
          },
          {
            label: 'Access Denied',
            icon: 'pi pi-fw pi-lock',
            to: '/',
          },
        ],
      },
      {
        label: 'Crud',
        icon: 'pi pi-fw pi-pencil',
        to: '/',
      },
      {
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/',
      },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        to: '/',
      },
    ],
  },
  {
    label: 'Hierarchy',
    items: [
      {
        label: 'Submenu 1',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 1.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
          {
            label: 'Submenu 1.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }],
          },
        ],
      },
      {
        label: 'Submenu 2',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Submenu 2.1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
              { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            ],
          },
          {
            label: 'Submenu 2.2',
            icon: 'pi pi-fw pi-bookmark',
            items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }],
          },
        ],
      },
    ],
  },
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
