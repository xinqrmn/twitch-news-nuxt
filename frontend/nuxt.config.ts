// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/icon',
    '@pinia/nuxt',
    'shadcn-nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://localhost:3000/api',
      strapiBaseUrl: process.env.STRAPI_BASE_URL || 'http://localhost:1337/'
    },
  },
  css: ['~/assets/styles/main.scss', '~/assets/styles/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
  icon: {
    mode: 'svg',
  },
  shadcn: {
    prefix: '',
    componentDir: '~/components/ui',
  },
})
