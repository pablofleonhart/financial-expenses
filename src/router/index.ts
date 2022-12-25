import { createRouter, createWebHistory } from "vue-router";
import Revenue from "../components/revenues/Revenue.vue";
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
      path: "/revenue",
      name: "revenue",
      component: Revenue,
    },
    {
      path: "/investments",
      name: "investments",
      component: Investments,
    },
  ],
});

export default router;
