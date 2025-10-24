<template>
  <div>
    <Card>
      <template #title>
        <div class="flex items-center justify-between">
          <h2>Список постов</h2>
          <Button
            label="Создать новость"
            variant="text"
            icon="pi pi-plus"
            @click="$router.push('/posts/new')"
          ></Button>
        </div>
      </template>
      <template #content>
        <PostsTable></PostsTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import PostsTable from '@/components/posts/PostsTable.vue'
</script>

<style scoped></style>
