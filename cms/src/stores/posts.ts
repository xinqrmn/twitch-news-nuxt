import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { CreatePostDto } from '@/api/posts'
import { createPost, getPosts, getPostById, updatePost, deletePostById } from '@/api/posts'

export const usePostsStore = defineStore('posts', () => {
  const list = ref<Posts[]>([])
  const loading = ref<boolean>(false)
  const post = reactive<CreatePostDto>({})

  const pagination = ref<PaginationParams>({ limit: 20, currentPage: 1 })

  const totalItems = ref<number>(0)

  const fetchPosts = async (override?: PaginationParams) => {
    loading.value = true
    try {
      const res = await getPosts({ ...pagination.value, ...(override || {}) })
      list.value = res.data?.data
      totalItems.value = res.data?.pagination?.totalItems ?? 0
    } catch (err) {
      console.error('Ошибка получения постов: ', err)
    } finally {
      loading.value = false
    }
  }

  const fetchPostById = async (id: number) => {
    loading.value = true
    try {
      const res = await getPostById(id, pagination)
      post.value = res.data?.data
    } catch (e) {
      console.error('Ошибка получения поста по ID: ', e)
    } finally {
      loading.value = false
    }
  }

  const createNewPost = async (data: CreatePostDto) => {
    try {
      const res = await createPost(data)
      if (res.data?.success) await fetchPosts()
    } catch (err) {
      console.error('Ошибка создания поста:', err)
    }
  }

  const updatePostById = async (id: number | string, data: CreatePostDto) => {
    loading.value = true
    try {
      const res = await updatePost(Number(id), data)
      if (res.data?.success) {
        if (post.value?.id === Number(id)) {
          post.value = { ...post.value, ...data }
        }
        await fetchPosts()
      }
      return res
    } catch (e) {
      console.error('Ошибка обновления новости: ', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const deletePost = async (id: number | string) => {
    loading.value = true
    try {
      const res = await deletePostById(Number(id))
      await fetchPosts()
      return res
    } catch (e) {
      console.error('Ошибка удаления поста: ', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    list,
    loading,
    post,
    pagination,
    totalItems,
    fetchPosts,
    fetchPostById,
    createNewPost,
    deletePost,
    updatePostById,
  }
})
