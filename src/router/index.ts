import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore'
import MessageComponent from '@/components/Message/MessageComponent.vue';
import ListMessageComponent from '@/components/Message/ListMessageComponent.vue';

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
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('@/components/User/UserProfile.vue'),
    },
    {
      path: '/message',
      name: 'message',
      meta: { requiresAuth: true },
      component: MessageComponent,
    },
    {
      path: '/list-message',
      name: 'list-message',
      meta: { requiresAuth: true },
      component: ListMessageComponent,
    },
  ]
})

// Navigation guard để kiểm tra xem người dùng có token hay không
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login', query: { returnUrl: to.fullPath } }); // Chuyển đến trang đăng nhập nếu chưa đăng nhập
  } else {
    next(); // Tiếp tục đi đến route yêu cầu
  }
});

export default router
