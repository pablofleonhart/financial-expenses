<template>
  <div class="expense-budget-list h-[83%] overflow-auto scrollbar">
    <table class="table-auto h-fit w-full bg-neutral-color-500">
      <thead class="expense-budget-list-head w-screen sticky top-0">
        <tr class="flex w-full h-10 bg-neutral-color-700">
          <th
            v-for="column in expenseBudgetColumns"
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
      <tbody class="expense-budget-list-body flex flex-col w-full">
        <div v-if="expenseBudgets.length">
          <tr
            class="flex w-full items-center h-10 even:bg-neutral-color-700"
            v-for="(item, index) in expenseBudgets"
            :key="item.id"
          >
            <td
              class="flex items-center text-lg p-2 h-full w-1/6 min-w-24 justify-end"
            >
              <div class="flex w-full h-6 bg-neutral-color-300 rounded-full">
                <div
                  class="h-6 font-medium text-black text-center items-center p-0.5 leading-none rounded-full"
                  :class="getProgressClass(item.percentageCompleted)"
                  :style="getProgressWidth(item.percentageCompleted)"
                >
                  {{ formatPercentage(item.percentageCompleted) }}
                </div>
              </div>
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-24 justify-end">
              {{
                formatCurrency(item.spentAmount, item.currencyType || 'euro')
              }}
            </td>
            <td class="flex items-center p-2 h-full w-1/6 min-w-24 justify-end">
              {{ formatCurrency(item.amount, item.currencyType || 'euro') }}
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
            <td class="flex items-center p-2 h-full w-1/6 min-w-44">
              <span class="w-full truncate" :title="item.description">
                {{ item.description }}
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
import { Ref, onMounted, onUnmounted, ref } from 'vue';
import {
  LAST_DAY_OF_MONTH,
  formatCurrency,
  formatPercentage,
  getOrderIcon,
  getProgressClass,
  getProgressWidth,
} from '../../utils';
import {
  getBudgets,
  getCategoryIconById,
  sortExpenseBudgets,
} from '../../services';
import { Budget } from '../budgets/Budget';
import {
  EVENT_BUS_EVENTS,
  registerEventBusListener,
  unregisterEventBusListener,
} from '../../event-bus';
import { IBudgetFilter } from '../../types';
import { getExpenseBusinessMonth } from '../../store/expenses';

type BudgetColumn = {
  key: string;
  name: string;
  class: string;
  static?: boolean;
};

const expenseBudgetColumns: BudgetColumn[] = [
  {
    key: 'percentageCompleted',
    name: '% atingido',
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
    key: 'categoryName',
    name: 'Categoria',
    class: 'min-w-36 justify-center',
  },
  {
    key: 'description',
    name: 'Descrição',
    class: 'min-w-36',
  },
  {
    key: 'actions',
    name: 'Ações',
    class: 'min-w-24 justify-center cursor-default',
    static: true,
  },
];

const emit = defineEmits(['onEditExpense', 'onDeleteExpense']);
const expenseBudgets: Ref<Budget[]> = ref([]);

function updateBudgetsList(filterData: IBudgetFilter) {
  const date = new Date(getExpenseBusinessMonth().startDate);
  date.setDate(LAST_DAY_OF_MONTH + 2);
  filterData.targetDate = date.toISOString();

  getBudgets(filterData).then((budgets: Budget[]) => {
    expenseBudgets.value = budgets;
    if (!budgets) {
      return;
    }
    const currentColumn = expenseBudgetColumns.find(
      (column) => column.key === orderColumn.value,
    );
    if (currentColumn) {
      orderList(currentColumn, true);
    }
  });
}

onMounted(async () => {
  registerEventBusListener(EVENT_BUS_EVENTS.UPDATE_BUDGETS, updateBudgetsList);
  updateBudgetsList({
    targetDate: getExpenseBusinessMonth().startDate.toISOString(),
  });
});

onUnmounted(() => {
  unregisterEventBusListener(
    EVENT_BUS_EVENTS.UPDATE_BUDGETS,
    updateBudgetsList,
  );
});

const orderColumn = ref('percentageCompleted');
let ascOrder = true;

function orderList(column: BudgetColumn, keepOrder = false) {
  if (column.static) {
    return;
  }
  if (orderColumn.value === column.key && !keepOrder) {
    ascOrder = !ascOrder;
  }
  orderColumn.value = column.key;
  sortExpenseBudgets(expenseBudgets.value, {
    column: orderColumn.value,
    order: ascOrder ? 'asc' : 'desc',
  });
}

const onEditExpense = (index: number) => {
  emit('onEditExpense', expenseBudgets.value[index]);
};

const onDeleteExpense = (index: number) => {
  emit('onDeleteExpense', expenseBudgets.value[index]);
};
</script>
