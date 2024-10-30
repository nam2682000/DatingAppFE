import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore'
import ListMessageComponent from '@/components/Message/ListMessageComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Auth/LoginForm.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/Auth/SignupForm.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView
    },
    {
      path: '/home',
      name: 'homeAlias',
      meta: { requiresAuth: true },
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      meta: { requiresAuth: true },
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('@/components/User/UserProfile.vue')
    },
    {
      path: '/list-message',
      name: 'list-message',
      meta: { requiresAuth: true },
      component: () => import('@/components/Message/ListMessageComponent.vue')
    },
    {
      path: '/checker',
      name: 'checker',
      meta: { requiresAuth: true },
      component: () => import('@/components/SwipeCard/SwipeCardComponent.vue')
    }
  ]
})

// Navigation guard để kiểm tra xem người dùng có token hay không
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() // Lấy store quản lý trạng thái xác thực

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Nếu route yêu cầu xác thực mà người dùng chưa đăng nhập
    next({
      name: 'login',
      query: { returnUrl: to.fullPath } // Chuyển hướng đến trang đăng nhập
    })
  } else {
    // Nếu người dùng đã đăng nhập hoặc route không yêu cầu xác thực
    next() // Tiếp tục chuyển đến route
  }
})

export default router
