<template>
  <div class="expense-list">
    <table class="table-auto w-full overflow-hidden">
      <thead class="expense-list-head flex w-full">
        <tr class="flex w-full h-12 bg-neutral-color-700">
          <th
            v-for="column in investmentColumns"
            :key="column.key"
            class="flex items-center p-2 h-full w-1/4 cursor-pointer hover:bg-secondary-color-300"
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
        <tr
          class="flex w-full items-center h-12 even:bg-neutral-color-700"
          v-for="(item, index) in investmentList"
          :key="item.id"
        >
          <td class="flex items-center p-2 h-full w-1/4 min-w-24 justify-end">
            {{ formatCurrency(item.amount, item.currency) }}
          </td>
          <td
            class="flex items-center p-2 h-full w-1/4 min-w-24 justify-center"
          >
            {{ item.broker }}
          </td>
          <td
            class="flex items-center justify-center p-2 h-full w-1/4 min-w-44"
          >
            {{ item.holder }}
          </td>
          <td class="flex items-center p-2 h-full w-1/4 min-w-24">
            <div class="flex w-full justify-evenly">
              <ph-pencil
                class="button-action hover:bg-blue-500"
                @click="onEditInvestment(index)"
              />
              <ph-trash
                class="button-action hover:bg-red-500"
                @click="onDeleteInvestment(index)"
              />
            </div>
          </td>
        </tr>
        <!-- <div v-else class="flex justify-center mt-4">
          Nenhum investimento cadastrado ainda
        </div> -->
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatCurrency, getOrderIcon } from '../../utils';
import {
  allInvestmentItems,
  investmentSettings,
  sortInvestments,
} from '../../services';
import { Investment } from './Investment';

const investmentColumns = [
  {
    key: 'amount',
    name: 'Valor',
    class: 'min-w-24 justify-end',
  },
  {
    key: 'broker',
    name: 'Banco/Corretora',
    class: 'min-w-36 justify-center',
  },
  {
    key: 'holder',
    name: 'Titular',
    class: 'min-w-16 justify-center',
  },
  {
    key: 'actions',
    name: 'Ações',
    class: 'min-w-24 justify-center cursor-default',
    static: true,
  },
];

const emit = defineEmits(['onEditInvestment', 'onDeleteInvestment']);

const investmentList = computed<Array<Investment>>(() => allInvestmentItems);
const orderColumn = computed(() => {
  return investmentSettings.column;
});

const orderDirection = computed(() => {
  return investmentSettings.ascending;
});

const orderList = (column: any) => {
  if (column.static) {
    return;
  }
  sortInvestments(column.key);
};

const onEditInvestment = (index: number) => {
  emit('onEditInvestment', investmentList.value[index]);
};

const onDeleteInvestment = (index: number) => {
  emit('onDeleteInvestment', investmentList.value[index]);
};
</script>
