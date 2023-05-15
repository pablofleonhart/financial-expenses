import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Expenses from '../components/expenses/Expenses.vue';
import Login from '../components/auth/Login.vue';
import Revenues from '../components/revenues/Revenues.vue';
import Wallets from '../components/wallets/Wallets.vue';
import {
  isAuthenticated,
  isNotAuthenticated,
  registerMiddlewares,
} from './middlewares';
import Wishes from '../components/wishes/Wishes.vue';
import Dashboard from '../components/dashboard/Dashboard.vue';
import Travels from '../components/travels/Travels.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: { middlewares: [isAuthenticated], title: 'Dashboard' },
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
      meta: { middlewares: [isAuthenticated], title: 'Gastos acumulados' },
    },
    {
      path: '/variable-expenses',
      name: 'variable-expenses',
      component: Expenses,
      meta: { middlewares: [isAuthenticated], title: 'Gastos variáveis' },
    },
    {
      path: '/fixed-expenses',
      name: 'fixed-expenses',
      component: Expenses,
      meta: { middlewares: [isAuthenticated], title: 'Gastos previstos' },
    },
    {
      path: '/revenues',
      name: 'revenues',
      component: Revenues,
      meta: {
        middlewares: [isAuthenticated],
        title: 'Receitas',
      },
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallets,
      meta: { middlewares: [isAuthenticated], title: 'Carteiras' },
    },
    {
      path: '/wishes',
      name: 'wishes',
      component: Wishes,
      meta: { middlewares: [isAuthenticated], title: 'Planos' },
    },
    {
      path: '/travels',
      name: 'travels',
      component: Travels,
      meta: { middlewares: [isAuthenticated], title: 'Viagens' },
    },
  ] as RouteRecordRaw[],
});

registerMiddlewares(router);

export default router;
