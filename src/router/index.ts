import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Expenses from '../components/expenses/Expenses.vue';
import Login from '../components/auth/Login.vue';
import Revenues from '../components/revenues/Revenues.vue';
import {
  isAuthenticated,
  isNotAuthenticated,
  isRootAuthenticated,
  registerMiddlewares,
} from './middlewares';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Redirect',
      meta: { middlewares: [isRootAuthenticated] },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { middlewares: [isNotAuthenticated] },
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses,
      meta: { middlewares: [isAuthenticated] },
    },
    {
      path: '/revenues',
      name: 'revenues',
      component: Revenues,
      meta: { middlewares: [isAuthenticated] },
    },
  ] as RouteRecordRaw[],
});

registerMiddlewares(router);

export default router;
