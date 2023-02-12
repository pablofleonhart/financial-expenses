<template>
  <div class="revenue-list">
    <table class="table-auto w-full overflow-hidden">
      <thead class="revenue-list-head flex w-full">
        <tr class="flex w-full h-12 bg-secondary-color-dark">
          <th
            v-for="column in revenueColumns"
            :key="column.key"
            class="flex items-center p-2 h-full w-1/6 cursor-pointer hover:bg-primary-color"
            :class="column.class"
            @click="orderList(column)"
          >
            <component
              v-if="!column.static && orderColumn === column.key"
              :is="getOrderIcon(orderDirection)"
              class="h-4 w-4 mr-1"
            />
            <span>
              {{ column.name }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="revenue-list-body flex flex-col w-full">
        <tr
          class="flex w-full items-center h-12 even:bg-secondary-color-dark"
          v-for="(item, index) in revenueList"
          :key="item.id"
        >
          <td class="flex items-center p-2 h-full w-16">
            <component :is="getRevenueTypeIcon(item.type)" class="h-5 w-5" />
          </td>
          <td class="flex items-center p-2 h-full w-1/6 justify-end">
            {{ formatCurrency(item.amount, item.currency) }}
          </td>
          <td class="flex items-center p-2 h-full w-1/6">
            {{ item.description }}
          </td>
          <td class="flex items-center p-2 h-full w-1/6">
            {{ formatDate(item.date) }}
          </td>
          <td class="flex items-center p-2 h-full w-1/6">
            {{ item.bank }}
          </td>
          <td class="flex items-center p-2 h-full w-1/6">
            <div class="flex w-full justify-evenly">
              <complete-icon
                v-if="showRevenueActions"
                class="h-6 w-6 cursor-pointer"
                @click="onCompleteRevenue(index)"
              />
              <undo-icon
                v-else
                class="h-6 w-6 cursor-pointer"
                @click="onReopenRevenue(index)"
              />
              <edit-icon
                class="h-6 w-6 cursor-pointer"
                @click="onEditRevenue(index)"
              />
              <delete-icon
                class="h-6 w-6 cursor-pointer"
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
  formatCurrency,
  formatDate,
  getOrderIcon,
  getRevenueTypeIcon,
} from '../../utils';
import CompleteIcon from '../../assets/CheckCircleIcon.vue';
import DeleteIcon from '../../assets/DeleteIcon.vue';
import EditIcon from '../../assets/EditIcon.vue';
import UndoIcon from '../../assets/UndoIcon.vue';
import {
  completeRevenue,
  filteredRevenueItems,
  reopenRevenue,
  revenueSettings,
  showRevenueActions,
  sortRevenues,
} from '../../services';
import { Revenue } from './Revenue';

const revenueColumns = [
  {
    key: 'type',
    name: 'Tipo',
    class: 'w-16',
  },
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
    class: '',
  },
  {
    key: 'bank',
    name: 'Banco',
    class: '',
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

const onCompleteRevenue = (index: number) => {
  completeRevenue(revenueList.value[index]);
};

const onReopenRevenue = (index: number) => {
  reopenRevenue(revenueList.value[index]);
};

const onEditRevenue = (index: number) => {
  emit('onEditRevenue', revenueList.value[index]);
};

const onDeleteRevenue = (index: number) => {
  emit('onDeleteRevenue', revenueList.value[index]);
};
</script>
