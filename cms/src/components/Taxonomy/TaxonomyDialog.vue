<template>
  <Dialog v-model:visible="visible" modal :header="`Edit ${props.type}`" style="min-width: 450px">
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Название: </label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="editedTaxonomy" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="emit('close')"></Button>
      <Button type="button" label="Save" @click="handleSubmit"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, defineModel, ref } from 'vue'
import { useTagsStore } from '@/stores/tags'
import { useCategoriesStore } from '@/stores/categories'

interface ITaxonomyData {
  id: number | string
  name: string
  type: 'cat' | 'tag'
}

const tagsStore = useTagsStore()
const categoriesStore = useCategoriesStore()

const editedTaxonomy = ref<string>('')

const props = defineProps<{
  taxonomyData: ITaxonomyData
}>()

const emit = defineEmits<{
  handleEdit: [data: ITaxonomyData]
  close
}>()

const visible = defineModel<boolean>()

const handleSubmit = async () => {
  await emit('handleEdit', {
    id: props.id,
    name: editedTaxonomy.value,
    type: props.taxonomyData.type,
  })
}

onMounted(async () => {
  if (props.taxonomyData.type === 'tag') {
    await tagsStore.getAllTags()
    // emit('close')
    visible.value = false
  } else if (props.taxonomyData.type === 'cat') {
    await categoriesStore.getAllCategories()
    // emit('close')
    visible.value = false
  }
})
</script>

<style scoped></style>
