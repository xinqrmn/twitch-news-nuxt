import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounter = defineStore('counter', () => {
  const concha = ref('test')
  const pidor = ref(12)

  return {
    concha,
    pidor,
  }
})
