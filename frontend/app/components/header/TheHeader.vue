<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const isMobile = ref(false)
const search = ref<string>('')
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
          <UInput
            v-model="search"
            color="primary"
            variant="subtle"
            placeholder="Поиск..."
            class="w-48"
            @keyup.enter="goToSearch"
          />
          <UButton variant="solid" class="font-normal text-white">Войти</UButton>
        </div>
        <div v-else class="actions-mobile">
          <USlideover title="Menu">
            <UButton variant="ghost" size="xl" icon="mdi:menu"></UButton>

            <template #body>
              <HeaderNavigation :is-mobile="isMobile" />
            </template>

            <template #footer>
              <div class="header-actions w-full">
                <div class="flex flex-col gap-5">
                  <UInput
                    v-model="search"
                    color="primary"
                    variant="subtle"
                    placeholder="Поиск..."
                    class="search-input"
                  />
                  <UButton
                    v-if="false"
                    variant="solid"
                    color="primary"
                    class="text-white justify-center w-full"
                    >Войти
                  </UButton>
                  <div v-else class="flex items-center gap-4">
                    <USkeleton
                      class="h-10 min-w-10 w-10 rounded-full"
                      style="background-color: white"
                    />
                    <div class="space-y-3 w-full">
                      <USkeleton class="h-4 w-full" style="background-color: white" />
                      <USkeleton class="h-4 w-3/4" style="background-color: white" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </USlideover>
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

  @media (max-width: 1024px) {
    &-logo {
      img {
        max-width: 5rem;
      }
    }
  }
}
</style>
