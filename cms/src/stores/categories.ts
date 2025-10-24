import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { CategoryDto } from '@/api/categories'
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/api/categories'

export const useCategoriesStore = defineStore('categories', () => {
  const list = ref<CategoryDto[]>([])
  const loading = ref<boolean>(false)
  const category = reactive<CategoryDto>({})

  const pagination = ref<PaginationParams>({ limit: 20, currentPage: 1 })

  const totalItems = ref<number>(0)

  const getAllCategories = async (override?: PaginationParams) => {
    loading.value = true
    try {
      const res = await getCategories({ ...pagination.value, ...(override || {}) })
      list.value = res.data?.data
      totalItems.value = res.data?.pagination?.totalItems ?? 0
    } catch (e) {
      console.error('Ошибка получения тегов: ', e)
    } finally {
      loading.value = false
    }
  }

  const createNewCategory = async (data: CategoryDto) => {
    loading.value = true
    try {
      const res = await createCategory(data)
      console.log('Создание тега: ', res)
      if ((res, data?.success)) await getAllCategories()
    } catch (e) {
      console.error('Ошибка получения тега: ', e)
    } finally {
      loading.value = false
    }
  }

  const updateCategoryById = async (id: number | string, data: CategoryDto) => {
    loading.value = true
    try {
      const res = await updateCategory(Number(id), data)
      if (res.data?.success) {
        if (category.value?.id === Number(id)) {
          category.value = { ...category.value, ...data }
        }
        await getAllCategories()
      }
    } catch (e) {
      console.error('Ошибка обновления тега: ', e)
    } finally {
      loading.value = false
    }
  }

  const deleteCategoryById = async (id: number | string) => {
    loading.value = true
    try {
      const res = await deleteCategory(Number(id))
      if (res.data?.success) await getAllCategories()
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
    getAllCategories,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById,
  }
})
