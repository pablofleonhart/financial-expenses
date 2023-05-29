<template>
  <div class="expense-budget-list h-[83%] overflow-auto scrollbar">
    <table class="table-auto h-fit w-full bg-neutral-color-500">
      <thead class="expense-budget-list-head w-screen sticky top-0">
        <tr class="flex w-full h-10 bg-neutral-color-700">
          <th
            v-for="column in expenseBudgetColumns"
            :key="column.key"
            class="flex items-center p-2 h-full w-1/5 cursor-pointer hover:bg-secondary-color-300"
            :class="column.class"
            @click="orderList(column)"
          >
            <component
              v-if="!column.static && orderColumn === column.key"
              :is="getOrderIcon(orderDirection)"
              size="20"
              class="mr-1"
            />
            <span>
              {{ column.name }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="expense-budget-list-body flex flex-col w-full">
        <div v-if="expenseBudgets.length">
          <tr
            class="flex w-full items-center h-10 even:bg-neutral-color-700"
            v-for="(item, index) in expenseBudgets"
            :key="item.id"
          >
            <td
              class="flex items-center text-lg p-2 h-full w-1/5 min-w-24 justify-end"
            >
              <div class="flex w-full h-6 bg-neutral-color-300 rounded-full">
                <div
                  class="h-6 font-medium text-black text-center items-center p-0.5 leading-none rounded-full"
                  :class="getProgressClass(item.budgetPercentage)"
                  :style="getProgressWidth(item.budgetPercentage)"
                >
                  {{ formatPercentage(item.budgetPercentage) }}
                </div>
              </div>
            </td>
            <td class="flex items-center p-2 h-full w-1/5 min-w-24 justify-end">
              {{ getSpentAmount(item) }}
            </td>
            <td class="flex items-center p-2 h-full w-1/5 min-w-24 justify-end">
              {{ formatCurrency(item.amount, item.currency || 'euro') }}
            </td>
            <td class="flex items-center p-2 h-full w-1/5 min-w-36">
              <div class="flex w-full justify-center">
                <component
                  :is="getCategoryIcon(item.category.type)"
                  class="h-6 w-6"
                />
                <span class="ml-2">
                  {{ item.category.name }}
                </span>
              </div>
            </td>
            <td class="flex items-center p-2 h-full w-1/5 min-w-24">
              <div class="flex w-full justify-evenly">
                <ph-pencil
                  class="button-action text-neutral-color-off hover:bg-blue-500 hover:text-neutral-50"
                  @click="onEditExpense(index)"
                />
                <ph-trash
                  class="button-action text-neutral-color-off hover:bg-red-500 hover:text-neutral-50"
                  @click="onDeleteExpense(index)"
                />
              </div>
            </td>
          </tr>
        </div>
        <div v-else class="font-bold flex justify-center mt-4">
          Nenhum orçamento criado para este periodo
        </div>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import {
  formatCurrency,
  formatPercentage,
  getCategoryIcon,
  getOrderIcon,
  getProgressClass,
  getProgressWidth,
} from '../../utils';
import {
  budgetExpenseItems,
  expenseBudgetSettings,
  loadBudgetItems,
  selectedExpensePeriod,
  sortExpenseBudgets,
} from '../../services';
import { Expense } from './Expense';

const expenseBudgetColumns = [
  {
    key: 'budgetPercentage',
    name: 'Progresso',
    class: 'min-w-28 justify-center',
  },
  {
    key: 'spentAmount',
    name: 'Valor gasto',
    class: 'justify-end',
  },
  {
    key: 'amount',
    name: 'Valor orçado',
    class: 'justify-end',
  },
  {
    key: 'category.name',
    name: 'Categoria',
    class: 'min-w-36 justify-center',
  },
  {
    key: 'actions',
    name: 'Ações',
    class: 'min-w-24 justify-center cursor-default',
    static: true,
  },
];

const emit = defineEmits(['onEditExpense', 'onDeleteExpense']);

const expenseBudgets = computed<Array<Expense>>(() => budgetExpenseItems);

onMounted(async () => {
  await loadBudgetItems(selectedExpensePeriod);
});

const orderColumn = computed(() => {
  return expenseBudgetSettings.column;
});

const orderDirection = computed(() => {
  return expenseBudgetSettings.ascending;
});

const orderList = (column: any) => {
  if (column.static) {
    return;
  }
  sortExpenseBudgets(column.key);
};

const getSpentAmount = (expense: Expense) => {
  // @ts-ignore
  return formatCurrency(expense.spentAmount, expense.currency);
};

const onEditExpense = (index: number) => {
  emit('onEditExpense', expenseBudgets.value[index]);
};

const onDeleteExpense = (index: number) => {
  emit('onDeleteExpense', expenseBudgets.value[index]);
};
</script>
