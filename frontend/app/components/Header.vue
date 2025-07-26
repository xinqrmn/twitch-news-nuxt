<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="container header-container">
      <NuxtLink to="#" class="header-logo">
        <img src="/images/logo.png" alt="logo" />
      </NuxtLink>
      <HeaderNavigation></HeaderNavigation>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  background: linear-gradient(176.66deg, #6f3cb3 16.92%, #a970ff 66.81%);
  position: relative;
  width: 100%;
  overflow: hidden;

  &-container {
    display: flex;
    align-items: center;
    background: inherit;
    position: relative;
    z-index: 11;
  }

  &-logo {
    z-index: 11;
    position: relative;
    background: $color-background-nav;
    height: 100%;
    padding: 15px 0;

    &::before {
      background-color: inherit;
      content: '';
      height: 100%;
      position: absolute;
      right: -26px;
      top: 0;
      transform: skewX(-20deg);
      width: 40px;
    }

    img {
      display: block;
      width: 100%;
      max-height: 40px;
      position: relative;
    }
  }
  &::before {
    background: $color-background-nav;
    position: absolute;
    content: "";
    height: 100%;
    left: 0;
    top: 0;
    width: 50%;
    z-index: 0;
  }

}

</style>