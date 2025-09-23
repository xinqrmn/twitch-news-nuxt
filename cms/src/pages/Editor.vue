<script setup lang="ts">
import Milkdown from '@/components/Milkdown/MilkdownEditor.vue'
import { MilkdownProvider } from '@milkdown/vue'
import { useTemplateRef, ref } from 'vue'

const title = ref('')
const subtitle = ref('')
const coverImage = ref('')
const createdAt = ref(new Date().toISOString())
const author = ref('')
const badges = ref<string[]>([])
const tags = ref<string[]>([])
const content = ref('')

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

function saveNews() {
  const newsData = {
    title: title.value,
    subtitle: subtitle.value,
    coverImage: coverImage.value,
    createdAt: createdAt.value,
    author: author.value,
    badges: badges.value,
    tags: tags.value,
    content: content.value,
  }
  console.log('Сохранение новости:', newsData)
}
</script>

<template>
  <Card class="p-6 space-y-6">
    <template #title>
      <div class="flex items-center justify-between">
        <h2>Редактирование новости</h2>
      </div>
    </template>

    <template #content>
      <div class="h-full overflow-hidden flex flex-col gap-4 ">
        <div>
          <label class="block mb-1 text-sm font-medium">Заголовок</label>
          <InputText v-model="title" class="w-full" placeholder="Введите заголовок" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Подзаголовок</label>
          <InputText v-model="subtitle" class="w-full" placeholder="Введите подзаголовок" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">URL обложки</label>
          <InputText v-model="coverImage" class="w-full" placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/EBU_Colorbars_HD.svg/1600px-EBU_Colorbars_HD.svg.png" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Автор</label>
          <InputText v-model="author" class="w-full" placeholder="Иван Иванович" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Бейджи</label>
          <Chips v-model="badges" separator="," class="w-full" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Теги</label>
          <Chips v-model="tags" separator="," class="w-full" />
        </div>

        <div class="border rounded-lg overflow-hidden grow overflow-y-auto">
          <MilkdownProvider>
            <Milkdown ref="editor" :markdown="markdown" />
          </MilkdownProvider>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-4 justify-end">
        <Button label="Получить markdown" class="p-button-outlined" @click="getMarkdown" />
        <Button label="Сохранить новость" class="p-button-success" @click="saveNews" />
      </div>
    </template>
  </Card>
</template>
