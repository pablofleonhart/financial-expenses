<template>
  <div class="expenses-container m-2 h-[90vh]">
    <div
      class="expense-action-bar flex flex-row justify-between items-center mx-4"
    >
      <business-month-selector @select-month="onChangeBusinessMonth" />
      <div class="flex">
        <add-button @click="onAddExpense"></add-button>
      </div>
    </div>
    <expenses-header />
    <expenses-page
      @on-edit-expense="onEditExpense"
      @on-delete-expense="onDeleteExpense"
      @on-edit-budget="onEditBudget"
      @on-delete-budget="onDeleteBudget"
    />
  </div>
  <expense-item-modal
    :opened="showExpenseItemModal"
    :expense="objExpense"
    @close="showExpenseItemModal = false"
  />
  <expense-budget-modal
    :opened="showExpenseBudgetModal"
    :budget="objBudget"
    @close="showExpenseBudgetModal = false"
  />
  <confirmation-modal
    :message="messageDeleteConfirmationModal"
    :show-modal="showDeleteConfirmationModal"
    @accept="onDeleteCallback"
    @cancel="showDeleteConfirmationModal = false"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AddButton from '../common/AddButton.vue';
import ExpensesHeader from './ExpensesHeader.vue';
import ExpensesPage from './ExpensesPage.vue';
import { deleteBudget, deleteExpense, getBudgets } from '../../services';
import { Expense } from './Expense';
import ConfirmationModal from '../common/ConfirmationModal.vue';
import ExpenseBudgetModal from './ExpenseBudgetModal.vue';
import ExpenseItemModal from './ExpenseItemModal.vue';
import { BusinessMonth, LAST_DAY_OF_MONTH } from '../../utils';
import { Budget } from '../budgets/Budget';
import { EVENT_BUS_EVENTS, emitEventBus } from '../../event-bus';
import BusinessMonthSelector from '../common/BusinessMonthSelector.vue';
import {
  getExpenseBusinessMonth,
  setExpenseBusinessMonth,
} from '../../store/expenses';

const showExpenseItemModal = ref(false);
const showExpenseBudgetModal = ref(false);
const showDeleteConfirmationModal = ref(false);
const messageDeleteConfirmationModal = ref('');
const onDeleteCallback = ref(() => {});
const objExpense = ref(new Expense());
const objBudget = ref(new Budget());
let expenseToDelete: Expense = new Expense();
let budgetToDelete: Budget = new Budget();
const $route = useRoute();

watch($route, () => {
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_EXPENSES);
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_BUDGETS);
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_ANALYTICS);
});

function onChangeBusinessMonth(businessMonth: BusinessMonth) {
  setExpenseBusinessMonth(businessMonth);
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_EXPENSES);
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_BUDGETS);
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_ANALYTICS);
}

onMounted(async () => {
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_EXPENSES);
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_BUDGETS);
});

function onAddExpense() {
  objExpense.value = new Expense();
  objBudget.value = new Budget();
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
}

function onEditExpense(expense: Expense) {
  objExpense.value = {
    ...expense,
    // installments: Number(expense.installments.toString().split('/')[0]),
  };
  showExpenseItemModal.value = true;
}

function onDeleteExpense(expense: Expense) {
  showDeleteConfirmationModal.value = true;
  messageDeleteConfirmationModal.value = 'Deseja realmente excluir esse gasto?';
  onDeleteCallback.value = onAcceptDeleteExpense;
  expenseToDelete = expense;
}

function onEditBudget(budget: Budget) {
  objBudget.value = { ...budget };
  showExpenseBudgetModal.value = true;
}

function onDeleteBudget(budget: Budget) {
  showDeleteConfirmationModal.value = true;
  messageDeleteConfirmationModal.value =
    'Deseja realmente excluir esse orçamento?';
  onDeleteCallback.value = onAcceptDeleteBudget;
  budgetToDelete = budget;
}

async function onAcceptDeleteExpense() {
  showDeleteConfirmationModal.value = false;
  await deleteExpense(expenseToDelete);
}

async function onAcceptDeleteBudget() {
  showDeleteConfirmationModal.value = false;
  await deleteBudget(budgetToDelete);
  emitEventBus(EVENT_BUS_EVENTS.UPDATE_BUDGETS);
}
</script>
