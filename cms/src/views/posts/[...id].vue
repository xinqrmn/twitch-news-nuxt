<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'
import Milkdown from '@/components/Milkdown/MilkdownEditor.vue'
import { MilkdownProvider } from '@milkdown/vue'
import { useTemplateRef, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const title = ref<string>('')
const subtitle = ref<string>('')
const metaDescription = ref<string>('')
const metaOgDescription = ref<string>('')
const metaOgTitle = ref<string>('')
const coverImageUrl = ref<string>('')
const badges = ref<number[]>([])
const tags = ref<number[]>([])

const postsStore = usePostsStore()
const toast = useToast()
const router = useRouter()

const markdown = ref<string>('')

const route = useRoute()
const isNew = computed(() => route.params.id === 'new')

const editor = useTemplateRef('editor')

const saveNews = async () => {
  try {
    let newsData = {
      title: title.value,
      subtitle: subtitle.value,
      metaDescription: metaDescription.value,
      metaOgDescription: metaOgDescription.value,
      metaOgTitle: metaOgTitle.value,
      coverImageUrl: coverImageUrl.value,
      content: editor.value?.getMarkdown() || '',
      tags: tags.value,
      badges: badges.value,
    }

    if (isNew.value) {
      const res = await postsStore.createNewPost(newsData)
      if (res.data?.success) {
        toast.add({
          severity: 'success',
          summary: 'Успех!',
          detail: 'Новость успешно создана',
          life: 3000,
        })
        setTimeout(() => {
          router.push('/posts')
        }, 1500)
      } else {
        toast.add({
          severity: 'error',
          summary: 'Ошибка!',
          detail: res.error?.message || 'Неизвестная ошибка при создании новости',
          life: 3000,
        })
      }
    } else {
      const res = await postsStore.updatePostById(route.params.id, newsData)
      if (res.data?.success) {
        await postsStore.fetchPostById(route.params.id)
        toast.add({
          severity: 'success',
          summary: 'Успех!',
          detail: 'Новость успешно обновлена',
          life: 3000,
        })
      } else {
        toast.add({
          severity: 'error',
          summary: 'Ошибка!',
          detail: res.error?.message || 'Неизвестная ошибка при обновлении новости',
          life: 3000,
        })
      }
    }
  } catch (error) {
    console.error('Ошибка при сохранении новости:', error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка!',
      detail: 'Произошла непредвиденная ошибка',
      life: 3000,
    })
  }
}

onMounted(async () => {
  try {
    if (!isNew.value) {
      await postsStore.fetchPostById(route.params.id)
      const res = postsStore.post.value
      title.value = res.title || ''
      subtitle.value = res.subtitle || ''
      metaDescription.value = res.metaDescription || ''
      metaOgDescription.value = res.metaOgDescription || ''
      metaOgTitle.value = res.metaOgTitle || ''
      coverImageUrl.value = res.coverImageUrl || ''
      badges.value = res.badges || []
      tags.value = res.tags || []

      setTimeout(() => {
        markdown.value = res.content || ''
      }, 100)
    }
  } catch (e) {
    console.error('Ошибка получения поста по ID: ', e)
    toast.add({
      severity: 'error',
      summary: 'Ошибка загрузки!',
      detail: 'Не удалось загрузить данные новости',
      life: 3000,
    })
  }
})
</script>

<template>
  <Card class="space-y-6">
    <template #title>
      <div class="flex items-center justify-between overflow-visible mb-4">
        <h2>{{ isNew ? 'Создание' : 'Редактирование' }} новости</h2>
        <Button @click="$router.push('/posts')">Вернуться назад</Button>
      </div>
    </template>

    <template #content>
      <div class="h-full flex flex-col gap-4 mb-4">
        <div>
          <label class="block mb-1 text-sm font-medium">URL обложки</label>
          <InputText
            v-model="coverImageUrl"
            class="w-full"
            placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/EBU_Colorbars_HD.svg/1600px-EBU_Colorbars_HD.svg.png"
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Заголовок</label>
          <InputText v-model="title" class="w-full" placeholder="Введите заголовок" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Подзаголовок</label>
          <InputText v-model="subtitle" class="w-full" placeholder="Введите подзаголовок" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Meta Og Title</label>
          <InputText v-model="metaOgTitle" class="w-full" placeholder="Введите мета-Заголовок" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Meta Description</label>
          <InputText v-model="metaDescription" class="w-full" placeholder="Введите мета-описание" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Meta Og Description</label>
          <InputText
            v-model="metaOgDescription"
            class="w-full"
            placeholder="Введите мета-ог-описание"
          />
        </div>

        <div class="posts-chips">
          <label class="block mb-1 text-sm font-medium">Бейджи</label>
          <AutoComplete v-model="badges" separator="," class="w-full" />
        </div>

        <div class="posts-chips">
          <label class="block mb-1 text-sm font-medium">Теги</label>
          <AutoComplete v-model="tags" separator="," class="w-full" />
        </div>

        <Fieldset legend="Текст поста" class="posts-md">
          <MilkdownProvider>
            <Milkdown ref="editor" :markdown="markdown" :key="markdown" />
          </MilkdownProvider>
        </Fieldset>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <Button
          label="Сохранить новость"
          class="p-button-success"
          @click="saveNews"
          :loading="postsStore.loading"
        ></Button>
      </div>
    </template>
  </Card>
</template>

<style lang="scss">
.posts-chips .p-autocomplete-input {
  width: 100%;
}

.posts-md {
  border: 1px solid #333;
  border-radius: 15px;
  padding: 10px;
}
</style>
