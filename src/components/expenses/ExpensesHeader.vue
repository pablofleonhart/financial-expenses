<template>
  <div class="expenses-header flex m-2 gap-2 items-center">
    <div
      class="expenses-budget-details flex h-fit gap-4 w-1/3 items-center justify-center text-lg bg-slate-300 rounded-xl"
    >
      <span class="flex w-1/2 justify-end">Orçado:</span>
      <div class="flex flex-col w-1/2 justify-start items-center font-bold">
        <span v-for="(item, key) in budgetsSum" :key="key">
          {{ formatCurrency(item, key) }}
        </span>
      </div>
    </div>
    <div
      class="expenses-details flex h-fit gap-4 w-1/3 items-center justify-center text-lg rounded-xl bg-yellow-200"
    >
      <span class="flex w-1/2 justify-end">Consolidado:</span>
      <div class="flex flex-col w-1/2 justify-start items-center font-bold">
        <span v-for="(item, key) in fullfiledExpensesSum" :key="key">
          {{ formatCurrency(item, key) }}
        </span>
      </div>
    </div>
    <div
      class="expenses-details flex h-fit gap-4 w-1/3 items-center justify-center text-lg rounded-xl bg-red-200"
    >
      <span class="flex w-1/2 justify-end">Projetado:</span>
      <div class="flex flex-col w-1/2 justify-start items-center font-bold">
        <span v-for="(item, key) in expensesSum" :key="key">
          {{ formatCurrency(item, key) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import {
  budgetsSum,
  expensesSum,
  fullfiledExpensesSum,
  getBudgets,
  getExpenses,
} from '../../services';
import { getExpenseBusinessMonth } from '../../store/expenses';
import { LAST_DAY_OF_MONTH, formatCurrency } from '../../utils';
import {
  EVENT_BUS_EVENTS,
  registerEventBusListener,
  unregisterEventBusListener,
} from '../../event-bus';

async function updateBudgets() {
  const date = new Date(getExpenseBusinessMonth().startDate);
  date.setDate(LAST_DAY_OF_MONTH + 2);
  getBudgets({ targetDate: date.toISOString() });
}

async function updateExpenses() {
  const startDate = new Date(getExpenseBusinessMonth().startDate);
  const endDate = new Date(getExpenseBusinessMonth().endDate);
  // filterData.startDate = startDate.toISOString();
  // filterData.endDate = endDate.toISOString();

  // const pathName = window.location.pathname;
  // if (pathName === '/expenses') {
  //   delete filterData.isVariable;
  // } else {
  //   filterData.isVariable =
  //     window.location.pathname.includes('variable-expenses');
  // }

  getExpenses({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });
}

onMounted(() => {
  registerEventBusListener(EVENT_BUS_EVENTS.UPDATE_BUDGETS, updateBudgets);
  registerEventBusListener(EVENT_BUS_EVENTS.UPDATE_EXPENSES, updateExpenses);
  updateBudgets();
  updateExpenses();
});

onUnmounted(() => {
  unregisterEventBusListener(EVENT_BUS_EVENTS.UPDATE_BUDGETS, updateBudgets);
  unregisterEventBusListener(EVENT_BUS_EVENTS.UPDATE_EXPENSES, updateExpenses);
});
</script>
