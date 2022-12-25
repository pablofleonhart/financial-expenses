import { createRouter, createWebHistory } from "vue-router";
import Revenue from "../components/revenue-component/Revenue.vue";
import Expenses from "../components/Expenses.vue";

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
  ],
});

export default router;
