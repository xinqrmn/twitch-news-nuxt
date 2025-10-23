import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import { useAuthStore } from '@/stores/auth'

import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

import '@/assets/tailwind.css'
import '@/assets/styles.scss'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f3eeff',
      100: '#e8deff',
      200: '#d1bcff',
      300: '#bb95ff',
      500: '#9940ff',
      400: '#a970ff',
      600: '#8300e8',
      700: '#6600b7',
      800: '#470083',
      900: '#2b0053',
      950: '#1c003a',
    },
  },
})

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(ConfirmationService)
app.use(ToastService)

const authStore = useAuthStore()
authStore.initializeAuth().then(() => {
  app.mount('#app')
})
