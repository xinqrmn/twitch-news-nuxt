import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "../stores/auth.ts"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: () => import('@/pages/Login.vue')},
        {path: '/dashboard',  component: () => import('@/pages/Dashboard.vue'), meta: {requiresAuth: true}},
    ]
})

router.beforeEach((to, _, next) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router