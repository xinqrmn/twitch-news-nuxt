import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { getStorageItems } from '../api/storage'
import type { PaginationParams } from '@/utils/requestHandler'
import type { MediaFile } from '../types/mediaFile'

export const useStorageStore = defineStore('storage', () => {
  const list = ref<MediaFile[]>([])
  const loading = ref(false)
  const urlList = ref<string[]>([])
  const pagination = ref<PaginationParams>({ limit: 20, currentPage: 1 })

  const totalItems = ref<number>(0)

  const fetchStorage = async (override?: PaginationParams) => {
    loading.value = true
    try {
      const res = await getStorageItems({ ...pagination.value, ...(override || {}) })
      list.value = res.data?.data
      urlList.value = list.value.map((item) => item.url)
      console.log(urlList.value)
      totalItems.value = res.data?.pagination?.totalItems ?? 0
    } catch (err) {
      console.error('Ошибка получения списка файлов: ', err)
    } finally {
      loading.value = false
    }
  }

  return {
    list,
    loading,
    pagination,
    totalItems,
    fetchStorage,
    urlList,
  }
})
