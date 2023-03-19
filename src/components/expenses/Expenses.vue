<template>
  <div class="expenses-page m-3">
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
import { onMounted, ref } from 'vue';
import AddButton from '../common/AddButton.vue';
import ExpensesFilterTabs from './ExpensesFilterTabs.vue';
import ExpensesHeader from './ExpensesHeader.vue';
import ExpensesPage from './ExpensesPage.vue';
import { deleteExpense, loadExpenses } from '../../services';
import { Expense } from './Expense';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import ExpenseItemModal from './ExpenseItemModal.vue';
import { copyExpense } from '../../utils';

const showExpenseItemModal = ref(false);
const showDeleteConfirmationModal = ref(false);
const objExpense = ref(new Expense());
let expenseToDelete: Expense = new Expense();

onMounted(async () => {
  await loadExpenses();
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
