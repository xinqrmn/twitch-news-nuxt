<template>
  <footer class="footer">
    <div class="footer__socials">
      <SocialLink hover-color="#24A1DE" link="https://t.me/Twitch_NewsRu" icon="mdi:telegram" />
      <SocialLink hover-color="#0077FF" link="/" icon="mdi:vk" />
      <SocialLink hover-color="#FF7700" link="/" icon="mdi:odnoklassniki" />
    </div>
    <div class="footer__links">
      <NuxtLink to="/">Контакты</NuxtLink>
      <NuxtLink to="/">Реклама</NuxtLink>
    </div>
    <USeparator />
    <div class="footer__copyright">
      <p class="copyright">© {{ getCurrentYear() }} Twitch News - Твич Новости</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SocialLink from './SocialLink.vue'

const getCurrentYear: () => number = function () {
  return new Date().getFullYear()
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: max-content;
  display: flex;
  flex-flow: column nowrap;
  padding: 2rem;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;
  background-color: $color-background-main;
  color: $color-text-main;
  font-family: $font-main;
  text-align: center;

  &__socials,
  &__links {
    display: flex;
    gap: 1rem;
  }
}
</style>
