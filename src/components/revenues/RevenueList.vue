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
          v-for="(item, index) in revenueList"
          :key="item.id"
          class="flex w-full items-center h-10 even:bg-neutral-color-700"
          :class="{
            'bg-red-100 even:bg-red-200 text-black': isLateRevenue(item),
          }"
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
              <ph-pencil
                class="button-action hover:text-blue-500"
                @click="onEditRevenue(index)"
              />
              <ph-trash
                class="button-action hover:text-red-500"
                @click="onDeleteRevenue(index)"
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
  isLate,
} from '../../utils';
import {
  fulfillRevenue,
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

const emit = defineEmits(['onEditRevenue', 'onDeleteRevenue']);

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

const handleRevenue = async (index: number) => {
  const item: Revenue = revenueList.value[index];
  if (item.fullfilled) {
    await reopenRevenue(revenueList.value[index]);
  } else {
    await fulfillRevenue(revenueList.value[index]);
  }
};

const onEditRevenue = (index: number) => {
  emit('onEditRevenue', copyRevenue(revenueList.value[index]));
};

const onDeleteRevenue = (index: number) => {
  emit('onDeleteRevenue', copyRevenue(revenueList.value[index]));
};

const isLateRevenue = (item: Revenue): boolean => {
  return !item.fullfilled && isLate(item.date);
};
</script>
