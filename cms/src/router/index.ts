import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('@/pages/Dashboard.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'users',
          component: () => import('@/pages/Users.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'editor',
          component: () => import('@/pages/Editor.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    { path: '/login', component: () => import('@/pages/Login.vue') },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (!auth.isInitialized) {
    await auth.initializeAuth()
  }

  if (to.meta?.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login' }
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return { path: '/' }
  }

  return true
})

export default router
