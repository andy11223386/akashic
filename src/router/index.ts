import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UserLogin from '../views/UserLogin.vue';
import { useUserStore } from '../stores/user'; // 導入您的用戶 store

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true, // 表示需要登入才能訪問
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加導航守衛
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;