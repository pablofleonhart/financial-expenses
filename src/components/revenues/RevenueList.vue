<template>
  <div class="revenue-list">
    <table class="table-auto w-full overflow-hidden">
      <thead class="revenue-list-head flex w-full">
        <tr class="flex w-full h-12 bg-secondary-color-dark">
          <th class="flex items-center p-2 h-full w-1/5 justify-end">Valor</th>
          <th class="flex items-center p-2 h-full w-1/5">Descrição</th>
          <th class="flex items-center p-2 h-full w-1/5">Data</th>
          <th class="flex items-center p-2 h-full w-1/5">Banco</th>
          <th class="flex items-center p-2 h-full w-1/5 justify-center">
            Ações
          </th>
        </tr>
      </thead>
      <tbody class="revenue-list-body flex flex-col w-full">
        <tr
          class="flex w-full items-center h-12 even:bg-secondary-color-dark"
          v-for="(item, index) in revenueList"
          :key="item.id"
        >
          <td class="flex items-center p-2 h-full w-1/5 justify-end">
            {{ formatCurrency(item.amount) }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            {{ item.description }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            {{ formatDate(item.date) }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            {{ item.bank }}
          </td>
          <td class="flex items-center p-2 h-full w-1/5">
            <div class="flex w-full justify-evenly">
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
import { formatCurrency, formatDate } from '../../utils/index';
import DeleteIcon from '../../assets/DeleteIcon.vue';
import EditIcon from '../../assets/EditIcon.vue';
import { revenueItems } from '../../services';
import { Revenue } from './Revenue';

const emit = defineEmits(['onEditRevenue', 'onDeleteRevenue']);

const revenueList = computed<Array<Revenue>>(() => revenueItems);

const onEditRevenue = (index: number) => {
  emit('onEditRevenue', revenueList.value[index]);
};

const onDeleteRevenue = (index: number) => {
  emit('onDeleteRevenue', revenueList.value[index]);
};
</script>
