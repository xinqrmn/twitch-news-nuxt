<template>
  <div>
    <Card>
      <template #title>
        <h2>Список постов</h2>
      </template>
      <template #content>
        <PostsTable></PostsTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import PostsTable from '@/components/posts/PostsTable.vue'
import { onMounted } from 'vue'

const postsStore = usePostsStore()

onMounted(async () => {
  await postsStore.fetchPosts()
  console.log('test')
})
</script>

<style scoped></style>
