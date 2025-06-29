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
              :is="getOrderIcon(ascOrder)"
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
              <div v-if="item.isVariable">
                {{ formatCurrency(item.amount, item.currencyType || 'euro') }}
              </div>
              <div v-else class="flex w-full justify-between items-center">
                <ph-arrows-clockwise class="text-neutral-color-off" size="24" />
                {{ formatCurrency(item.amount, item.currencyType || 'euro') }}
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
                  :is="getCategoryIconById(item.categoryID)"
                  class="h-6 w-6"
                />
                <span class="ml-2">
                  {{ item.categoryName }}
                </span>
              </div>
            </td>
            <td
              class="flex items-center justify-center p-2 h-full w-1/6 min-w-16"
            >
              <div v-if="item.currencyType" class="flex gap-1">
                <ph-coin-vertical
                  v-if="item.accountName === 'Dinheiro'"
                  size="24"
                />
                <component
                  v-else
                  :is="getCurrencyIconById(item.currencyType)"
                  size="24"
                />
                <span> {{ item.accountName }} </span>
              </div>
              <component v-else :is="getPaymentIcon(true)" size="24" />
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-44">
              <span class="w-full truncate" :title="item.description">
                {{ item.description }}
              </span>
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-24">
              <div class="flex w-full justify-evenly">
                <ph-thumbs-up
                  class="button-action hover:text-green-500"
                  :class="{
                    'text-green-500': item.fullfiledAt,
                    'text-neutral-500': !item.fullfiledAt,
                  }"
                  weight="fill"
                  @click="toggleFullfillment(index)"
                />
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
          Nenhuma despesa cadastrada para este periodo
        </div>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import {
  formatCurrency,
  formatDate,
  getOrderIcon,
  getPaymentIcon,
} from '../../utils';
import {
  sortExpenses,
  getCurrencyIconById,
  getCategoryIconById,
  getExpenses,
  fullfilExpense,
} from '../../services';
import { Expense } from './Expense';
import {
  EVENT_BUS_EVENTS,
  registerEventBusListener,
  unregisterEventBusListener,
} from '../../event-bus';
import { IExpenseFilter } from '../../types';
import { getExpenseBusinessMonth } from '../../store/expenses';

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
    key: 'categoryName',
    name: 'Categoria',
    class: 'min-w-36 justify-center',
  },
  {
    key: 'accountName',
    name: 'Pago com',
    class: 'min-w-16 justify-center',
  },
  {
    key: 'description',
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
const expensesList: Ref<Expense[]> = ref([]);

function updateExpensesList(filterData: IExpenseFilter) {
  const startDate = new Date(getExpenseBusinessMonth().startDate);
  const endDate = new Date(getExpenseBusinessMonth().endDate);
  filterData.startDate = startDate.toISOString();
  filterData.endDate = endDate.toISOString();

  const pathName = window.location.pathname;
  if (pathName === '/expenses') {
    delete filterData.isVariable;
  } else {
    filterData.isVariable =
      window.location.pathname.includes('variable-expenses');
  }

  getExpenses(filterData).then((expenses: Expense[]) => {
    expensesList.value = expenses;
    const currentColumn = expenseColumns.find(
      (column) => column.key === orderColumn.value,
    );
    if (currentColumn) {
      orderList(currentColumn, true);
    }
  });
}

onMounted(() => {
  registerEventBusListener(
    EVENT_BUS_EVENTS.UPDATE_EXPENSES,
    updateExpensesList,
  );
  // registerEventBusListener(
  //   EVENT_BUS_EVENTS.UPDATE_SELECTED_EXPENSE_PERIOD,
  //   updateSelectedPeriod,
  // );
  updateExpensesList({
    startDate: getExpenseBusinessMonth().startDate.toISOString(),
    endDate: getExpenseBusinessMonth().endDate.toISOString(),
  });
});

onUnmounted(() => {
  unregisterEventBusListener(
    EVENT_BUS_EVENTS.UPDATE_EXPENSES,
    updateExpensesList,
  );
  // unregisterEventBusListener(
  //   EVENT_BUS_EVENTS.UPDATE_SELECTED_EXPENSE_PERIOD,
  //   updateSelectedPeriod,
  // );
});

const orderColumn = ref('percentageCompleted');
let ascOrder = true;

function orderList(column: any, keepOrder = false) {
  if (column.static) {
    return;
  }
  if (orderColumn.value === column.key && !keepOrder) {
    ascOrder = !ascOrder;
  }
  orderColumn.value = column.key;
  sortExpenses(expensesList.value, {
    column: orderColumn.value,
    order: ascOrder ? 'asc' : 'desc',
  });
}

function onEditExpense(index: number) {
  emit('onEditExpense', expensesList.value[index]);
}

function onDeleteExpense(index: number) {
  emit('onDeleteExpense', expensesList.value[index]);
}

async function toggleFullfillment(index: number) {
  const item: Expense = expensesList.value[index];
  await fullfilExpense(item);
  updateExpensesList({});
}
</script>
