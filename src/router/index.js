
import dashboard from '../views/dashboard/index.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'dashboard',
        component: dashboard,
      },
    ],
  });
  
 // router.beforeEach(RouteMiddleware.beforeEach);
  
  export default router;