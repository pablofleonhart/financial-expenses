import { createRouter, createWebHistory } from "vue-router";
import Bills from "../components/Bills.vue";
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
      path: "/bills",
      name: "bills",
      component: Bills,
    },
  ],
});

export default router;
