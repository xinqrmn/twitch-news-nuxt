<template>
  <div class="grid">
    <Card class="max-h-max">
      <template #content>
        <CategoriesTable></CategoriesTable>
      </template>
    </Card>
    <Card class="max-h-max">
      <template #content>
        <TagsTable
          @editTag="
            (data) => {
              catValue = data
              typeValue = 'tag'
              showDialog = true
            }
          "
        ></TagsTable>
      </template>
    </Card>
    <TaxonomyDialog
      v-model:visible="showDialog"
      :taxonomyData="editData"
      @handleEdit="(data) => handleEdit(data.id, data.name, data.type)"
      @close="showDialog = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTagsStore } from '@/stores/tags'
import { useCategoriesStore } from '@/stores/categories'
import { ref } from 'vue'
import TaxonomyDialog from '@/components/Taxonomy/TaxonomyDialog.vue'

const typeValue = ref<'cat' | 'tag'>('cat')
const showDialog = ref<boolean>()

const tagsStore = useTagsStore()
const categoriesStore = useCategoriesStore()

const handleEdit = (id: number | string, newValue: string, type: 'cat' | 'tag') => {
  if (type === 'cat') {
    tagsStore.updateTagById(id, newValue)
    showDialog.value = false
  } else if (type === 'tag') {
    categoriesStore.updateCategoryById(id, newValue)
    showDialog.value = false
  }
}
</script>

<style lang="scss" scoped>
.grid {
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
}
</style>
