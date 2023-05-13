<template>
  <div class="transaction-list h-[83%] overflow-auto scrollbar">
    <table class="table-auto h-fit w-full bg-neutral-color-500">
      <thead class="transaction-list-head w-screen sticky top-0">
        <tr class="flex w-full h-10 bg-neutral-color-700">
          <th
            v-for="column in transactionCollumns"
            :key="column.key"
            class="flex items-center p-2 h-full w-1/6 cursor-pointer hover:bg-secondary-color-300"
            :class="column.class"
            @click="orderList(column)"
          >
            <component
              v-if="orderColumn === column.key"
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
      <tbody class="transaction-list-body flex flex-col w-full">
        <tr
          class="flex w-full items-center h-10 even:bg-neutral-color-700"
          v-for="(item, index) in transactionList"
          :key="item.id"
        >
          <td class="flex items-center justify-end p-2 h-full w-1/6 min-w-24">
            {{ formatCurrency(item.amountSent, item.source.currency) }}
          </td>
          <td
            class="flex items-center justify-center p-2 h-full w-1/6 min-w-24"
          >
            {{ getBalanceName(item.source) }}
          </td>
          <td class="flex items-center justify-end p-2 h-full w-1/6 min-w-44">
            {{ formatCurrency(item.amountReceived, item.target.currency) }}
          </td>
          <td
            class="flex items-center justify-center p-2 h-full w-1/6 min-w-44"
          >
            {{ getBalanceName(item.target) }}
          </td>
          <td
            class="flex items-center justify-center p-2 h-full w-1/6 min-w-44"
          >
            {{ formatDate(item.date) }}
          </td>
          <td
            class="flex items-center justify-center p-2 h-full w-1/6 min-w-44"
          >
            {{ item.description }}
          </td>
          <td class="flex items-center p-2 h-full w-1/6 min-w-24">
            <div class="flex w-full justify-evenly">
              <ph-pencil
                class="button-action text-neutral-color-off hover:bg-blue-500 hover:text-neutral-50"
                @click="onEditTransaction(index)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  copyTransaction,
  formatCurrency,
  formatDate,
  getOrderIcon,
} from '../../utils';
import { sortTransactions, transactionSettings } from '../../services';
import { Transaction } from './Transaction';
import { allTransactionsItems } from '../../services/transaction-service';
import { getBalanceName } from '../../utils/string-utils';

const transactionCollumns = [
  {
    key: 'amountSent',
    name: 'Valor Enviado',
    class: 'min-w-24 justify-end',
  },
  {
    key: 'source',
    name: 'Origem',
    class: 'min-w-24 justify-center',
  },
  {
    key: 'amountReceived',
    name: 'Valor Recebido',
    class: 'min-w-24 justify-end',
  },
  {
    key: 'target',
    name: 'Destino',
    class: 'min-w-24 justify-center',
  },
  {
    key: 'date',
    name: 'Data',
    class: 'min-w-36 justify-center',
  },
  {
    key: 'description',
    name: 'Descrição',
    class: 'min-w-16 justify-center',
  },
  {
    key: 'actions',
    name: 'Ações',
    class: 'min-w-24 justify-center cursor-default',
    static: true,
  },
];

const emit = defineEmits(['onEditTransaction', 'onDeleteWallet']);

const transactionList = computed<Array<Transaction>>(
  () => allTransactionsItems
);
const orderColumn = computed(() => {
  return transactionSettings.column;
});

const orderDirection = computed(() => {
  return transactionSettings.ascending;
});

const orderList = (column: any) => {
  if (column.static) {
    return;
  }
  sortTransactions(column.key);
};

const onEditTransaction = (index: number) => {
  emit('onEditTransaction', copyTransaction(transactionList.value[index]));
};
</script>
