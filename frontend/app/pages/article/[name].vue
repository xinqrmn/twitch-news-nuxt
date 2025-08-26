<script setup lang="ts">
// import type { Article } from '~/types/article'
import { useRoute } from 'vue-router'
import ArticleHeader from '~/components/article/ArticleHeader.vue'
import ArticleBody from '~/components/article/ArticleBody.vue'
import ArticleFooter from '~/components/article/ArticleFooter.vue'

const route = useRoute()
const name = route.params.name as string

useHead({
  title: 'TwitchNews | ' + name,
})
</script>

<template>
  <section class="col-span-full">
    <ArticleHeader></ArticleHeader>
    <ArticleBody></ArticleBody>
    <ArticleFooter></ArticleFooter>
  </section>
</template>

<style scoped lang="scss"></style>
