<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

const props = defineProps<{
  isMobile?: boolean
}>()
</script>

<template>
  <client-only>
    <div class="nav">
      <NavigationMenu :style="{ maxWidth: props.isMobile ? 'unset' : 'max-content' }">
        <NavigationMenuList :class="[props.isMobile ? 'nav-mobile' : 'nav-list']">
          <NavigationMenuItem>
            <NuxtLink to="/">
              <NavigationMenuLink>Новости</NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NuxtLink to="/streamers">
              <NavigationMenuLink>Стримеры</NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </client-only>
</template>

<style scoped lang="scss">
.nav {
  width: 100%;
  flex-grow: 1;
  @media (max-width: 1024px) {
    & div {
      width: 100%;
    }
  }
}

.nav-list {
  gap: 10px;
}

:deep(.nav-mobile) {
  width: 100%;
  padding: 0 16px;
  flex-direction: column;

  li {
    width: 100%;

    a {
      font-size: 16px;
      padding-left: 0;
    }
  }
}
</style>
