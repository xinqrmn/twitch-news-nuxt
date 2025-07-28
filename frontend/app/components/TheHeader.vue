<!--<script setup lang="ts">-->

<!--</script>-->

<!--<template>-->
<!--  <header class="header">-->
<!--    <div class="container header-container">-->
<!--      <NuxtLink to="#" class="header-logo">-->
<!--        <img src="/images/logo.png" alt="logo" />-->
<!--      </NuxtLink>-->
<!--      <HeaderNavigation></HeaderNavigation>-->
<!--    </div>-->
<!--  </header>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.header {-->
<!--  background: linear-gradient(176.66deg, #6f3cb3 16.92%, #a970ff 66.81%);-->
<!--  position: relative;-->
<!--  width: 100%;-->
<!--  overflow: hidden;-->

<!--  &-container {-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    background: inherit;-->
<!--    position: relative;-->
<!--    z-index: 11;-->
<!--  }-->

<!--  &-logo {-->
<!--    z-index: 11;-->
<!--    position: relative;-->
<!--    background: $color-background-nav;-->
<!--    height: 100%;-->
<!--    padding: 15px 0;-->

<!--    &::before {-->
<!--      background-color: inherit;-->
<!--      content: '';-->
<!--      height: 100%;-->
<!--      position: absolute;-->
<!--      right: -26px;-->
<!--      top: 0;-->
<!--      transform: skewX(-20deg);-->
<!--      width: 40px;-->
<!--    }-->

<!--    img {-->
<!--      display: block;-->
<!--      width: 100%;-->
<!--      max-height: 40px;-->
<!--      position: relative;-->
<!--    }-->
<!--  }-->
<!--  &::before {-->
<!--    background: $color-background-nav;-->
<!--    position: absolute;-->
<!--    content: "";-->
<!--    height: 100%;-->
<!--    left: 0;-->
<!--    top: 0;-->
<!--    width: 50%;-->
<!--    z-index: 0;-->
<!--  }-->

<!--}-->

<!--</style>-->

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  background: $color-background-nav;
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
