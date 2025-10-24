import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { TagsDto } from '@/api/tags'
import { getTags, createTag, updateTag, deleteTag } from '@/api/tags'

export const useTagsStore = defineStore('tags', () => {
  const list = ref<TagsDto[]>([])
  const loading = ref<boolean>(false)
  const tag = reactive<TagsDto>({})

  const pagination = ref<PaginationParams>({ limit: 20, currentPage: 1 })

  const totalItems = ref<number>(0)

  const getAllTags = async (override?: PaginationParams) => {
    loading.value = true
    try {
      const res = await getTags({ ...pagination.value, ...(override || {}) })
      list.value = res.data?.data
      totalItems.value = res.data?.pagination?.totalItems ?? 0
    } catch (e) {
      console.error('Ошибка получения тегов: ', e)
    } finally {
      loading.value = false
    }
  }

  const createNewTag = async (data: TagsDto) => {
    loading.value = true
    try {
      const res = await createTag(data)
      console.log('Создание тега: ', res)
      if ((res, data?.success)) await getAllTags()
    } catch (e) {
      console.error('Ошибка получения тега: ', e)
    } finally {
      loading.value = false
    }
  }

  const updateTagById = async (id: number | string, data: TagsDto) => {
    loading.value = true
    try {
      const res = await updateTag(Number(id), data)
      if (res.data?.success) {
        if (tag.value?.id === Number(id)) {
          tag.value = { ...tag.value, ...data }
        }
        await getAllTags()
      }
    } catch (e) {
      console.error('Ошибка обновления тега: ', e)
    } finally {
      loading.value = false
    }
  }

  const deleteTagById = async (id: number | string) => {
    loading.value = true
    try {
      const res = await deleteTag(Number(id))
      if (res.data?.success) await getAllTags()
    } catch (e) {
      console.error('Ошибка удаления тега: ', e)
    } finally {
      loading.value = false
    }
  }

  return {
    list,
    loading,
    pagination,
    totalItems,
    getAllTags,
    createNewTag,
    updateTagById,
    deleteTagById,
  }
})
