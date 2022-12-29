<template>
  <div class="expense-list">
    <table class="table-auto w-full overflow-hidden">
      <thead class="expense-list-head flex w-full">
        <tr class="flex w-full h-12 bg-secondary-color-dark">
          <th class="flex items-center p-2 h-full w-1/6 min-w-24 justify-end">
            Valor
          </th>
          <th
            class="flex items-center p-2 h-full w-1/6 min-w-24 justify-center"
          >
            Data
          </th>
          <th
            class="flex items-center p-2 h-full w-1/6 min-w-36 justify-center"
          >
            Categoria
          </th>
          <th
            class="flex items-center p-2 h-full w-1/6 min-w-16 justify-center"
          >
            Cartão
          </th>
          <th class="flex items-center p-2 h-full w-1/6 min-w-44">Descrição</th>
          <th
            class="flex items-center p-2 h-full w-1/6 min-w-24 justify-center"
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody class="expense-list-body flex flex-col w-full">
        <tr
          class="flex w-full items-center h-12 even:bg-secondary-color-dark"
          v-for="(item, index) in expenseList"
          :key="item.id"
        >
          <td class="flex items-center p-2 h-full w-1/6 min-w-24 justify-end">
            {{ formatCurrency(item.amount) }}
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
            <component :is="getPaymentIcon(item.card)" class="h-6 w-6" />
          </td>
          <td class="flex items-center p-2 h-full w-1/6 min-w-44">
            {{ item.note }}
          </td>
          <td class="flex items-center p-2 h-full w-1/6 min-w-24">
            <div class="flex w-full justify-evenly">
              <edit-icon
                class="h-6 w-6 cursor-pointer"
                @click="onEditExpense(index)"
              />
              <delete-icon
                class="h-6 w-6 cursor-pointer"
                @click="onDeleteExpense(index)"
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
  getCategoryIcon,
  getPaymentIcon,
} from '../../utils/index';
import DeleteIcon from '../../assets/DeleteIcon.vue';
import EditIcon from '../../assets/EditIcon.vue';
import { expenseItems } from '../../services';
import { Expense } from './Expense';

const emit = defineEmits(['onEditExpense', 'onDeleteExpense']);

const expenseList = computed<Array<Expense>>(() => expenseItems);

const onEditExpense = (index: number) => {
  emit('onEditExpense', expenseList.value[index]);
};

const onDeleteExpense = (index: number) => {
  emit('onDeleteExpense', expenseList.value[index]);
};
</script>
