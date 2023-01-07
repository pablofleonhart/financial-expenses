<template>
  <div class="expenses-page m-1">
    <ul class="tabs flex h-8 w-full border-b border-primary-color-dark">
      <li v-for="tab in tabItems" :key="tab.name">
        <button
          class="login-button flex items-center h-full px-2 text-black hover:bg-secondary-color-dark hover:border-x hover:border-t hover:border-primary-color-dark"
          :class="{
            'bg-secondary-color-dark font-bold border-x border-t border-primary-color-dark':
              tab.name === selectedTab,
          }"
          @click="filterItems(tab)"
        >
          {{ tab.name }}
        </button>
      </li>
    </ul>
    <div class="flex w-full justify-center font-bold">
      <span class="mr-2">Total:</span>
      {{ formatCurrency(expensesSum) }}
    </div>
    <div class="flex justify-end mt-12">
      <div
        class="add-button flex items-center justify-end cursor-pointer max-w-fit h-8 px-2 bg-primary-color-dark text-white border-2 border-primary-color-dark hover:bg-secondary-color-dark hover:text-black rounded"
        @click="onAddExpense"
      >
        <add-icon class="h-6 w-6" />
        <span class="ml-2"> Adicionar </span>
      </div>
    </div>
    <expense-list
      class="flex mt-8"
      @on-edit-expense="onEditExpense"
      @on-delete-expense="onDeleteExpense"
    />
  </div>
  <expense-item-modal
    :opened="showExpenseItemModal"
    :expense="objExpense"
    @close="showExpenseItemModal = false"
  />
  <delete-confirmation-modal
    message="Deseja realmente excluir esse gasto?"
    :show-delete-confirmation="showDeleteConfirmationModal"
    @accept="onAcceptDelete"
    @cancel="showDeleteConfirmationModal = false"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import ExpenseList from './ExpenseList.vue';
import {
  deleteExpense,
  expensesSum,
  filterExpenses,
  loadExpenses,
  selectedPeriod,
} from '../../services';
import { Expense } from './Expense';
import AddIcon from '../../assets/AddIcon.vue';
import ExpenseItemModal from './ExpenseItemModal.vue';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal.vue';
import {
  formatCurrency,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from '../../utils';

const showExpenseItemModal = ref(false);
const showDeleteConfirmationModal = ref(false);
const objExpense = ref(new Expense());
let expenseToDelete: Expense = new Expense();

const tabItems = [
  {
    name: 'Dezembro/22',
    from: new Date('2022-12-01'),
    to: new Date('2022-12-31'),
  },
  {
    name: 'Janeiro/23',
    from: getFirstDayOfMonth(),
    to: getLastDayOfMonth(),
  },
];

const selectedTab = computed(() => selectedPeriod.name);

onMounted(() => {
  loadExpenses();
});

const filterItems = (tab: any) => {
  filterExpenses(tab);
};

const onAddExpense = () => {
  objExpense.value = new Expense();
  showExpenseItemModal.value = true;
};

const onEditExpense = (expense: Expense) => {
  objExpense.value = new Expense(expense);
  showExpenseItemModal.value = true;
};

const onDeleteExpense = (expense: Expense) => {
  showDeleteConfirmationModal.value = true;
  expenseToDelete = expense;
};

const onAcceptDelete = () => {
  showDeleteConfirmationModal.value = false;
  deleteExpense(expenseToDelete);
};
</script>

<style lang="scss" scoped>
.add-button {
  &:hover {
    :deep(.add-icon) {
      circle,
      line {
        stroke: #000;
      }
    }
  }
}
</style>
