import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Expenses from '../components/expenses/Expenses.vue';
import Login from '../components/auth/Login.vue';
import Revenues from '../components/revenues/Revenues.vue';
import Investments from '../components/investments/Investments.vue';
import {
  isAuthenticated,
  isNotAuthenticated,
  isRootAuthenticated,
  registerMiddlewares,
} from './middlewares';
import Wishes from '../components/wishes/Wishes.vue';

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
      meta: { middlewares: [isAuthenticated], title: 'Despesas variáveis' },
    },
    {
      path: '/revenues',
      name: 'revenues',
      component: Revenues,
      meta: { middlewares: [isAuthenticated], title: 'Despesas previstas' },
    },
    {
      path: '/investments',
      name: 'investments',
      component: Investments,
      meta: { middlewares: [isAuthenticated], title: 'Investimentos' },
    },
    {
      path: '/wishes',
      name: 'wishes',
      component: Wishes,
      meta: { middlewares: [isAuthenticated], title: 'Desejos' },
    },
  ] as RouteRecordRaw[],
});

registerMiddlewares(router);

export default router;
