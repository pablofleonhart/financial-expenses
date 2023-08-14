<template>
  <div class="expense-list h-[83%] overflow-auto scrollbar">
    <table class="table-auto h-fit w-full bg-neutral-color-500">
      <thead class="expense-list-head w-screen sticky top-0">
        <tr class="flex w-full h-10 bg-neutral-color-700">
          <th
            v-for="column in expenseColumns"
            :key="column.key"
            class="flex items-center p-2 h-full w-1/6 cursor-pointer hover:bg-secondary-color-300"
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
            class="flex w-full items-center h-10 even:bg-neutral-color-700"
            v-for="(item, index) in expensesList"
            :key="item.id"
          >
            <td class="flex items-center p-2 h-full w-1/6 min-w-24 justify-end">
              <div v-if="item.variable">
                {{
                  formatCurrency(item.amount, item.payment?.currency || 'euro')
                }}
              </div>
              <div v-else class="flex w-full justify-between items-center">
                <ph-arrows-clockwise class="text-neutral-color-off" size="24" />
                {{
                  formatCurrency(item.amount, item.payment?.currency || 'euro')
                }}
              </div>
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
              <div v-if="item.payment.currency" class="flex gap-1">
                <ph-coin-vertical
                  v-if="item.payment.broker === 'Dinheiro'"
                  size="24"
                />
                <component
                  v-else
                  :is="getCurrencyIcon(item.payment.currency)"
                  size="24"
                />
                <span> {{ item.payment.broker }} </span>
              </div>
              <component v-else :is="getPaymentIcon(item.card)" size="24" />
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-44">
              <span class="w-full truncate" :title="item.note">
                {{ item.note }}
              </span>
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-24">
              <div class="flex w-full justify-evenly">
                <ph-pencil
                  class="button-action text-neutral-color-off hover:bg-blue-500 hover:text-neutral-50"
                  @click="onEditExpense(index)"
                />
                <ph-trash
                  class="button-action text-neutral-color-off hover:bg-red-500 hover:text-neutral-50"
                  @click="onDeleteExpense(index)"
                />
                <ph-thumbs-up
                  class="button-action hover:text-green-500"
                  :class="{
                    'text-green-500': item.fullfilled,
                    'text-neutral-500': !item.fullfilled,
                  }"
                  weight="fill"
                  @click="handleRevenue(index)"
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
  getCurrencyIcon,
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
    class: 'min-w-24 justify-center',
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
    key: 'payment.broker',
    name: 'Pago com',
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

const handleRevenue = async (index: number) => {
  const item: Expense = expensesList.value[index];
  if (item.fullfilled) {
    // await reopenRevenue(expensesList.value[index]);
  } else {
    // await fulfillRevenue(expensesList.value[index]);
  }
};
</script>
