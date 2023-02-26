<template>
  <div class="expense-list">
    <table class="table-auto w-full overflow-hidden">
      <thead class="expense-list-head flex w-full">
        <tr class="flex w-full h-12 bg-secondary-color-dark">
          <th
            v-for="column in expenseColumns"
            :key="column.key"
            class="flex items-center p-2 h-full w-1/6 cursor-pointer hover:bg-primary-color"
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
      <tbody class="expense-list-body flex flex-col w-full">
        <div v-if="expensesList.length">
          <tr
            class="flex w-full items-center h-12 even:bg-secondary-color-dark"
            v-for="(item, index) in expensesList"
            :key="item.id"
          >
            <td class="flex items-center p-2 h-full w-1/6 min-w-24 justify-end">
              {{ formatCurrency(item.amount, item.currency) }}
            </td>
            <td
              class="flex items-center p-2 h-full w-1/6 min-w-24 justify-center"
            >
              {{ formatDate(item.date) }}
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-36">
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
            <td
              class="flex items-center justify-center p-2 h-full w-1/6 min-w-16"
            >
              <component :is="getPaymentIcon(item.card)" size="24" />
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-44">
              {{ item.note }}
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-24">
              <div class="flex w-full justify-evenly">
                <ph-pencil
                  class="button-action hover:bg-blue-500"
                  @click="onEditExpense(index)"
                />
                <ph-trash
                  class="button-action hover:bg-red-500"
                  @click="onDeleteExpense(index)"
                />
              </div>
            </td>
          </tr>
        </div>
        <div v-else class="font-bold flex justify-center mt-4">
          Nenhuma despesa cadastrada para este periodo
        </div>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  formatCurrency,
  formatDate,
  getCategoryIcon,
  getOrderIcon,
  getPaymentIcon,
} from '../../utils';
import {
  filteredExpenseItems,
  expenseSettings,
  sortExpenses,
} from '../../services';
import { Expense } from './Expense';

const expenseColumns = [
  {
    key: 'amount',
    name: 'Valor',
    class: 'min-w-24 justify-end',
  },
  {
    key: 'date',
    name: 'Data',
    class: 'min-w-24 justify-center',
  },
  {
    key: 'category.name',
    name: 'Categoria',
    class: 'min-w-36 justify-center',
  },
  {
    key: 'card',
    name: 'Método',
    class: 'min-w-16 justify-center',
  },
  {
    key: 'note',
    name: 'Descrição',
    class: 'min-w-44',
  },
  {
    key: 'actions',
    name: 'Ações',
    class: 'min-w-24 justify-center cursor-default',
    static: true,
  },
];

const emit = defineEmits(['onEditExpense', 'onDeleteExpense']);

const expensesList = computed<Array<Expense>>(() => filteredExpenseItems);
const orderColumn = computed(() => {
  return expenseSettings.column;
});

const orderDirection = computed(() => {
  return expenseSettings.ascending;
});

const orderList = (column: any) => {
  if (column.static) {
    return;
  }
  sortExpenses(column.key);
};

const onEditExpense = (index: number) => {
  emit('onEditExpense', expensesList.value[index]);
};

const onDeleteExpense = (index: number) => {
  emit('onDeleteExpense', expensesList.value[index]);
};
</script>
