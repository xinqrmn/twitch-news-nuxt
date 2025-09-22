<script setup lang="ts">
import { Crepe } from '@milkdown/crepe'
import { Milkdown, useEditor } from '@milkdown/vue'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'

const props = defineProps<{
  markdown: string
}>()

let crepe: Crepe | null
useEditor((root) => {
  crepe = new Crepe({
    root,
    defaultValue: props.markdown,
    featureConfigs: {
      [Crepe.Feature.Placeholder]: {
        text: 'Печатайте...',
      },
    },
  })
  return crepe
})

defineExpose({
  getMarkdown: () => crepe?.getMarkdown() ?? '',
})
</script>

<template>
  <Milkdown />
</template>

<style scoped lang="scss"></style>
