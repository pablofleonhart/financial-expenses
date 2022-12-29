import { createRouter, createWebHistory } from 'vue-router';
import Expenses from '../components/expenses/Expenses.vue';
import Investments from '../components/investments/Investments.vue';
import Login from '../components/auth/Login.vue';
import Revenues from '../components/revenues/Revenues.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses,
    },
    {
      path: '/revenues',
      name: 'revenues',
      component: Revenues,
    },
    {
      path: '/investments',
      name: 'investments',
      component: Investments,
    },
  ],
});

export default router;
