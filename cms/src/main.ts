import App from './App.vue'
import {createApp} from 'vue'
import {createPinia} from "pinia"
import router from './router'

import Aura from '@primeuix/themes/aura'
import PrimeVue from "primevue/config"
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

import '@/assets/tailwind.css'
import '@/assets/styles.scss'

const pinia = createPinia()
createApp(App)
    .use(router)
    .use(pinia)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.app-dark'
            }
        },

    })
    .use(ConfirmationService)
    .use(ToastService)
    .mount('#app')
