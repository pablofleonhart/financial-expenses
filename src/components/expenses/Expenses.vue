<template>
  <div class="expenses-page m-1">
    <expenses-filter-tabs />
    <expenses-header @on-add-expense="onAddExpense" />
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
  <delete-confirmation-modal
    message="Deseja realmente excluir esse gasto?"
    :show-delete-confirmation="showDeleteConfirmationModal"
    @accept="onAcceptDelete"
    @cancel="showDeleteConfirmationModal = false"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ExpensesFilterTabs from './ExpensesFilterTabs.vue';
import ExpensesHeader from './ExpensesHeader.vue';
import ExpensesPage from './ExpensesPage.vue';
import { deleteExpense, loadExpenses } from '../../services';
import { Expense } from './Expense';
import ExpenseItemModal from './ExpenseItemModal.vue';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal.vue';

const showExpenseItemModal = ref(false);
const showDeleteConfirmationModal = ref(false);
const objExpense = ref(new Expense());
let expenseToDelete: Expense = new Expense();

onMounted(() => {
  loadExpenses();
});

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
