import { createRouter, createWebHistory } from 'vue-router';
import Expenses from '../components/expenses/Expenses.vue';
import Investments from '../components/investments/Investments.vue';
import Login from '../components/auth/Login.vue';
import Revenues from '../components/revenues/Revenues.vue';
import {
  isAuthenticated,
  isNotAuthenticated,
  registerMiddlewares,
} from './middlewares';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/investments',
      name: 'investments',
      component: Investments,
      meta: { middlewares: [isAuthenticated] },
    },
  ],
});

registerMiddlewares(router);

export default router;
