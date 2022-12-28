import { createRouter, createWebHistory } from "vue-router";
import Revenues from "../components/revenues/Revenues.vue";
import Expenses from "../components/expenses/Expenses.vue";
import Investments from '../components/investments/Investments.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/expenses",
      name: "expenses",
      component: Expenses,
    },
    {
      path: "/revenues",
      name: "revenues",
      component: Revenues,
    },
    {
      path: "/investments",
      name: "investments",
      component: Investments,
    },
  ],
});

export default router;
