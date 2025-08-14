import { useWindowSize } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useGlobals = defineStore('globals', () => {
  const { width } = useWindowSize()
  const isMobile = ref(false)

  watch(
    width,
    () => {
      if (width.value < 1024) {
        isMobile.value = true
      } else isMobile.value = false
    },
    { immediate: true }
  )

  return { isMobile }
})
