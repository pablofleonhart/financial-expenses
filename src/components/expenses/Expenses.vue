<template>
  <div class="expenses-container m-3 h-[90vh]">
    <div
      class="expense-action-bar flex flex-row w-full justify-evenly items-center m-2"
    >
      <period-selector
        :selected-period="selectedExpensePeriod"
        @select-option="onChangePeriod"
      />
      <div class="flex">
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
  <expense-budget-modal
    :opened="showExpenseBudgetModal"
    :expense="objExpense"
    @close="showExpenseBudgetModal = false"
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
import PeriodSelector from '../common/PeriodSelector.vue';
import ExpensesHeader from './ExpensesHeader.vue';
import ExpensesPage from './ExpensesPage.vue';
import {
  deleteExpense,
  filterExpenses,
  loadExpenses,
  selectedExpensePeriod,
  showFixedExpense,
  showVariablesExpense,
  travelExpense,
} from '../../services';
import { Expense } from './Expense';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import ExpenseBudgetModal from './ExpenseBudgetModal.vue';
import ExpenseItemModal from './ExpenseItemModal.vue';
import { copyExpense } from '../../utils';

const showExpenseItemModal = ref(false);
const showExpenseBudgetModal = ref(false);
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

const onChangePeriod = (period: any) => {
  filterExpenses(period);
};

const onAddExpense = () => {
  objExpense.value = new Expense();
  const tabSettings = localStorage.getItem('expense-tab');
  let selectedTab = null;
  if (tabSettings) {
    selectedTab = JSON.parse(tabSettings);
  }
  if (selectedTab === 'budget') {
    showExpenseBudgetModal.value = true;
  } else {
    showExpenseItemModal.value = true;
  }
};

const onEditExpense = (expense: Expense) => {
  objExpense.value = copyExpense(expense);
  const tabSettings = localStorage.getItem('expense-tab');
  let selectedTab = null;
  if (tabSettings) {
    selectedTab = JSON.parse(tabSettings);
  }
  if (selectedTab === 'budget') {
    showExpenseBudgetModal.value = true;
  } else {
    showExpenseItemModal.value = true;
  }
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
