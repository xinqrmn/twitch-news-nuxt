<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <div class="nav">
    <NavigationMenu>
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
  </div>
</template>

<style scoped lang="scss">
.nav {
  width: 100%;
  flex-grow: 1;
}

.nav-list {
  gap: 10px;
}
</style>
