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
          component: () => import('@/views/Dashboard.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'users',
          component: () => import('@/views/Users.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'posts',
          component: () => import('@/views/posts/Posts.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'posts/editor',
          component: () => import('@/views/posts/Editor.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'streamers',
          component: () => import('@/views/streamers/Streamers.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'streamers/editor',
          component: () => import('@/views/streamers/Editor.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'settings',
          component: () => import('@/views/Settings.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'doc',
          component: () => import('@/views/Documentation.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    { path: '/login', component: () => import('@/views/Login.vue') },
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
