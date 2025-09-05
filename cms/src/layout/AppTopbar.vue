<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout'

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout()
</script>

<template>
  <div class="layout-topbar">
    <div class="topbar__logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/">
        <img class="h-[3rem] block" src="/logo.png" alt="logo image" />
      </router-link>
    </div>

    <div class="topbar__actions-container">
      <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
        <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
      </button>
      <button type="button" class="layout-topbar-action">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button>
      <button type="button" class="layout-topbar-action">
        <i class="pi pi-inbox"></i>
        <span>Messages</span>
      </button>
      <button type="button" class="layout-topbar-action">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
