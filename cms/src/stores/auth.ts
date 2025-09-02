<<<<<<< Updated upstream
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
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
    },
  },
=======
import {defineStore} from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false
    }),
    actions: {
        async login(username: string, password: string) {
            // Здесь будет реальный API вызов
            console.log(username.toString(), password)
            const data = await fetch('http://localhost:9000/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({email: username.toString(), password: password})
            })
            const hello = await axios.get('http://localhost:9000/api')
            console.log(hello, 'hello')
            console.log(data, 'asdasdasdasd')
            // this.isAuthenticated = true
        },
        logout() {
            // this.isAuthenticated = false
        }
    }
>>>>>>> Stashed changes
})
