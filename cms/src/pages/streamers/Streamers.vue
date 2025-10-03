<script setup lang="ts">
import UsersTable from '@/components/Users/UsersTable.vue'
</script>

<template>
  <Card class="space-y-6 h-full">
    <template #title>
      <div class="flex items-center justify-between">
        <h2>Список стримеров</h2>
      </div>
    </template>
    <template #content>
      <UsersTable
        @showDialog="
          (data) => {
            editData = data
            showDialog = true
          }
        "
        @userDelete="handleDelete"
      />
    </template>
  </Card>
</template>

<style scoped lang="scss"></style>
