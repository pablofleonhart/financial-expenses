<template>
  <div class="expenses-container m-3 h-[90vh]">
    <div class="flex flex-row">
      <expenses-filter-tabs />
      <div class="flex justify-end">
        <add-button @click="onAddExpense"></add-button>
      </div>
    </div>
    <expenses-header />
    <expenses-page
      @on-edit-expense="onEditExpense"
      @on-delete-expense="onDeleteExpense"
    />
  </div>
  <expense-item-modal
    :opened="showExpenseItemModal"
    :expense="objExpense"
    @close="showExpenseItemModal = false"
  />
  <confirmation-modal
    message="Deseja realmente excluir esse gasto?"
    :show-modal="showDeleteConfirmationModal"
    @accept="onAcceptDelete"
    @cancel="showDeleteConfirmationModal = false"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AddButton from '../common/AddButton.vue';
import ExpensesFilterTabs from './ExpensesFilterTabs.vue';
import ExpensesHeader from './ExpensesHeader.vue';
import ExpensesPage from './ExpensesPage.vue';
import {
  deleteExpense,
  filterExpenses,
  loadExpenses,
  showFixedExpense,
  showVariablesExpense,
  travelExpense,
} from '../../services';
import { Expense } from './Expense';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import ExpenseItemModal from './ExpenseItemModal.vue';
import { copyExpense } from '../../utils';

const showExpenseItemModal = ref(false);
const showDeleteConfirmationModal = ref(false);
const objExpense = ref(new Expense());
let expenseToDelete: Expense = new Expense();
const $route = useRoute();

const applyFilterExpenses = () => {
  let variableExpense = true;
  let fixedExpense = true;

  if ($route.fullPath === '/fixed-expenses') {
    fixedExpense = true;
    variableExpense = false;
  } else if ($route.fullPath === '/variable-expenses') {
    fixedExpense = false;
    variableExpense = true;
  }

  showFixedExpense.value = fixedExpense;
  showVariablesExpense.value = variableExpense;
  travelExpense.value = null;
  filterExpenses();
};

onMounted(async () => {
  await loadExpenses();
  applyFilterExpenses();
});

watch($route, () => {
  applyFilterExpenses();
});

const onAddExpense = () => {
  objExpense.value = new Expense();
  showExpenseItemModal.value = true;
};

const onEditExpense = (expense: Expense) => {
  objExpense.value = copyExpense(expense);
  showExpenseItemModal.value = true;
};

const onDeleteExpense = (expense: Expense) => {
  showDeleteConfirmationModal.value = true;
  expenseToDelete = expense;
};

const onAcceptDelete = async () => {
  showDeleteConfirmationModal.value = false;
  await deleteExpense(expenseToDelete);
};
</script>
