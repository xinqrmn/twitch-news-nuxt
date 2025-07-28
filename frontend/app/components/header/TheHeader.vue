<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'vue-router'

const search = ref('')
const router = useRouter()

const goToSearch = () => {
  if (search.value.trim()) {
    router.push({ name: 'search', query: { q: search.value } })
  }
}
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <NuxtLink to="/" class="header-logo">
        <img src="/images/logo.png" alt="logo" />
      </NuxtLink>

      <HeaderNavigation />

      <div class="header-actions">
        <Input
          v-model="search"
          placeholder="Поиск..."
          class="search-input"
          @keyup.enter="goToSearch"
        />
        <Button variant="secondary" class="login-button">Войти</Button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  background: $color-background-main;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  &-container {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 1rem;
  }

  &-logo {
    display: block;

    img {
      display: block;
      width: 100%;
      max-height: 4rem;
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .search-input {
    background-color: #2c2c31;
    border: none;
    color: white;
    font-size: 0.9rem;
    padding: 0.4rem 0.75rem;
    width: 180px;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px $color-background-primary;
    }
  }

  .login-button {
    background-color: $color-background-primary;
    color: white;
    padding: 0.4rem 1rem;

    &:hover {
      background-color: #772ce8;
    }
  }
}
</style>
