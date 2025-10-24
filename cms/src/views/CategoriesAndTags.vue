<template>
  <div class="grid">
    <Card class="max-h-max">
      <template #content>
        <CategoriesTable></CategoriesTable>
      </template>
    </Card>
    <Card class="max-h-max">
      <template #content>
        <TagsTable></TagsTable>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
}
</style>
