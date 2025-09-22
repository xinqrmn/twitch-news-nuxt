<script setup lang="ts">
import Milkdown from '@/components/Milkdown/MilkdownEditor.vue'
import { MilkdownProvider } from '@milkdown/vue'
import { useTemplateRef } from 'vue'

const markdown = `# Ща бы в **дотку**...

> Киси-киси, мяу-мяу. Киси-киси, мя-мя-мяу :*

105-й, база, **ответьте**.

<br />

![0.99](https://avatars.mds.yandex.net/i?id=925a5aaf3e86fceb34b552dc7b54ee3f7365dd20-12749638-images-thumbs\&n=13 "ЫЫЫ")
`

const editor = useTemplateRef('editor')

const getMarkdown = () => {
  console.log(editor.value.getMarkdown())
}
</script>

<template>
  <Card
    class="space-y-6 h-[87dvh]"
    :pt="{
      body: 'h-full',
      content: 'grow max-h-full overflow-hidden',
    }"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <h2>Редактирование</h2>
      </div>
    </template>
    <template #content>
      <div class="h-full overflow-y-auto">
        <MilkdownProvider>
          <Milkdown ref="editor" :markdown="markdown" />
        </MilkdownProvider>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4">
        <Button label="Получить markdown" class="w-full" @click="getMarkdown" />
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss"></style>
