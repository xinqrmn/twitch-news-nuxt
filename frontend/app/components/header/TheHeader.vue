<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const { width } = useWindowSize()
const isMobile = ref(false)
const search = ref('')
const router = useRouter()

const goToSearch = () => {
  if (search.value.trim()) {
    router.push({ name: 'search', query: { q: search.value } })
  }
}

watch(
  width,
  () => {
    if (width.value < 1024) {
      isMobile.value = true
    } else isMobile.value = false
  },
  { immediate: true }
)
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <NuxtLink to="/" class="header-logo">
        <img src="/images/logo.png" alt="logo" />
      </NuxtLink>

      <HeaderNavigation v-if="!isMobile" />

      <div class="header-actions">
        <div v-if="!isMobile" class="actions-desktop">
          <Input
            v-model="search"
            placeholder="Поиск..."
            class="search-input"
            @keyup.enter="goToSearch"
          />
          <Button variant="secondary" class="login-button">Войти</Button>
        </div>
        <div v-else class="actions-mobile">
          <Sheet trap-focus="false">
            <SheetTrigger as-child>
              <Button variant="default" size="icon" as-child>
                <Icon size="2em" name="mdi:menu"></Icon>
              </Button>
            </SheetTrigger>
            <SheetContent :prevent-auto-focus="true" class="mobile-sidemenu">
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <HeaderNavigation :is-mobile="isMobile" />
              <SheetFooter>
                <div class="header-actions w-full">
                  <div class="flex flex-col gap-5">
                    <Input v-model="search" placeholder="Поиск..." class="search-input" />
                    <Button v-if="true" variant="secondary" class="login-button w-full"
                      >Войти</Button
                    >
                    <div v-else class="flex items-center space-x-4">
                      <Skeleton class="h-10 w-10 rounded-full" style="background-color: white" />
                      <div class="space-y-3">
                        <Skeleton class="h-4 w-[175px]" style="background-color: white" />
                        <Skeleton class="h-4 w-[175px]" style="background-color: white" />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
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
  z-index: 22;

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
    margin-left: auto;
    .actions {
      &-desktop {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      &-mobile {
        // background-color: transparent;
      }
    }
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
  @media (max-width: 1024px) {
    &-logo {
      img {
        max-width: 5rem;
      }
    }
  }
}
</style>
