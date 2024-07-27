import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UserLogin from '../views/UserLogin.vue';
import Profile from '../views/Profile.vue';
import { useUserStore } from '../stores/user';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const userToken = localStorage.getItem('userToken')

  console.log("to.meta.requiresAuth", to.meta.requiresAuth)
  console.log("userToken", userToken)


  if (to.meta.requiresAuth && !userToken) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
