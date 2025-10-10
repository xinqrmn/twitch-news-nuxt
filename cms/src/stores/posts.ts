import { defineStore } from 'pinia'
import type {} from '@/types/posts'
import { getPosts } from '@/api/posts'
import { ref } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const list = ref<Posts[]>()
  const loading = ref(false)
  const pagination = ref<PaginationParams>({ limit: 20, currentPage: 1 })

  const fetchPosts = async (override?: PaginationParams) => {
    loading.value = true
    console.log('test')
    try {
      const res = await getPosts({ ...pagination.value, ...(override || {}) })
      list.value = res.data
      console.log('list dasdas')
      console.log(list.value)
    } catch (err) {
      console.error('Ошибка получения постов: ', err)
    } finally {
      loading.value = true
    }
  }

  return {
    loading,
    fetchPosts,
    list,
  }
})
