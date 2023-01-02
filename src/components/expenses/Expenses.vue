<template>
  <div class="m-3">
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
import { onMounted, ref } from 'vue';
import ExpenseList from './ExpenseList.vue';
import { deleteExpense, expensesSum, loadExpenses } from '../../services';
import { Expense } from './Expense';
import AddIcon from '../../assets/AddIcon.vue';
import ExpenseItemModal from './ExpenseItemModal.vue';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal.vue';
import { formatCurrency } from '../../utils';

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
