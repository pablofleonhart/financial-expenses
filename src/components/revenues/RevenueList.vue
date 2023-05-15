<template>
  <div class="revenue-list h-[91%] overflow-auto scrollbar">
    <table class="table-auto h-fit w-full bg-neutral-color-500">
      <thead class="revenue-list-head w-screen sticky top-0">
        <tr class="flex w-full h-10 bg-neutral-color-700">
          <th
            v-for="column in revenueColumns"
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
      <tbody class="revenue-list-body flex flex-col w-full">
        <tr
          class="flex w-full items-center h-10 even:bg-neutral-color-700"
          v-for="(item, index) in revenueList"
          :key="item.id"
        >
          <td class="flex items-center p-2 h-full w-1/5 justify-end">
            {{ formatCurrency(item.amount, item.currency) }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5 min-w-48">
            <span class="w-full truncate" :title="item.description">
              {{ item.description }}
            </span>
          </td>
          <td class="flex items-center justify-center p-2 h-full w-1/5">
            {{ formatDate(item.date) }}
          </td>
          <td class="flex items-center justify-center p-2 h-full w-1/5">
            {{
              item.payment.currency ? getBalanceName(item.payment) : item.bank
            }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            <div class="flex w-full justify-evenly">
              <!-- <ph-check-circle
                v-if="showRevenueActions"
                class="button-action text-neutral-color-off hover:bg-green-500 hover:text-neutral-50"
                @click="onCompleteRevenue(index)"
              />
              <ph-arrow-counter-clockwise
                v-else
                class="button-action text-neutral-color-off hover:bg-yellow-500 hover:text-neutral-50"
                @click="onReopenRevenue(index)"
              /> -->
              <ph-pencil
                class="button-action text-neutral-color-off hover:bg-blue-500 hover:text-neutral-50"
                @click="onEditRevenue(index)"
              />
              <ph-trash
                class="button-action text-neutral-color-off hover:bg-red-500 hover:text-neutral-50"
                @click="onDeleteRevenue(index)"
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
  copyRevenue,
  formatCurrency,
  formatDate,
  getOrderIcon,
} from '../../utils';
import {
  completeRevenue,
  filteredRevenueItems,
  reopenRevenue,
  revenueSettings,
  sortRevenues,
} from '../../services';
import { Revenue } from './Revenue';
import { getBalanceName } from '../../utils/string-utils';

const revenueColumns = [
  {
    key: 'amount',
    name: 'Valor',
    class: 'justify-end',
  },
  {
    key: 'description',
    name: 'Descrição',
    class: '',
  },
  {
    key: 'date',
    name: 'Data',
    class: 'justify-center',
  },
  {
    key: 'bank',
    name: 'Banco/Conta',
    class: 'justify-center',
  },
  {
    key: 'actions',
    name: 'Ações',
    class: 'justify-center cursor-default',
    static: true,
  },
];

const emit = defineEmits([
  'onCompleteRevenue',
  'onEditRevenue',
  'onDeleteRevenue',
]);

const revenueList = computed<Array<Revenue>>(() => filteredRevenueItems);
const orderColumn = computed(() => {
  return revenueSettings.column;
});

const orderDirection = computed(() => {
  return revenueSettings.ascending;
});

const orderList = (column: any) => {
  if (column.static) {
    return;
  }
  sortRevenues(column.key);
};

const onCompleteRevenue = async (index: number) => {
  await completeRevenue(revenueList.value[index]);
};

const onReopenRevenue = async (index: number) => {
  await reopenRevenue(revenueList.value[index]);
};

const onEditRevenue = (index: number) => {
  emit('onEditRevenue', copyRevenue(revenueList.value[index]));
};

const onDeleteRevenue = (index: number) => {
  emit('onDeleteRevenue', copyRevenue(revenueList.value[index]));
};
</script>
