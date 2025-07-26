<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu class="nav">
    <NavigationMenuList class="nav-list">
      <NavigationMenuItem>
        <NuxtLink to="#">
          <NavigationMenuLink>Новости</NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NuxtLink to="#">
          <NavigationMenuLink>Стримеры</NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style scoped lang="scss">
.nav {
  //background-color: $color-background-primary;
  width: 100%;
  padding-left: 40px;
}

.nav-list {
  gap: 10px;
}
</style>