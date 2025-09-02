import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false
    }),
    actions: {
        login(username: string, password: string) {
            // Здесь будет реальный API вызов
            if (username === 'admin' && password === '1234') {
                this.isAuthenticated = true
                return true
            }
            return false
        },
        logout() {
            this.isAuthenticated = false
        }
    }
})
