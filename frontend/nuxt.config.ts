// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/content', '@nuxt/icon', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://localhost:3000/api',
    },
  },
})
