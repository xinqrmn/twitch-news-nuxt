import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/pages/Login.vue') },
    {
      path: '/dashboard',
      component: () => import('@/pages/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      component: () => import('@/pages/Users.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  await auth.ensureAuthChecked()

  if (to.meta?.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login' }
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return { path: '/dashboard' }
  }

  return true
})

export default router
