
import dashboard from '../views/dashboard.vue';
import login from '../views/login.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'dashboard',
        component: dashboard,
        meta: { 
          requiresAuth: true 
        }
      },
      {
        path: '/login',
        name: 'login',
        component: login,
        meta: { 
          requiresAuth: false 
        }
      },
    ],
  });
  
 // router.beforeEach(RouteMiddleware.beforeEach);
  
  export default router;