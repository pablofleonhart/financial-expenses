import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { reactive } from 'vue';
import { Expense } from '../components/expenses/Expense';
import {
  useAddExpenseMutation,
  useGetExpensesQuery,
  usePublishExpenseMutation,
  useUpdateExpenseMutation,
} from '../graphql/generated';
import { loadCategories } from './category-service';
import { copyExpense } from '../utils';

const initialize = () => {
  provideApolloClient(apolloClient);
};

export const expenseItems: Array<Expense> = reactive([]);

const updateLocalStorage = () => {
  localStorage.setItem('expenseItems', JSON.stringify(expenseItems));
};

const getExpenseByID = (id: string): Expense | null => {
  if (!id) {
    return null;
  }
  return expenseItems.filter((item) => item.id === id)[0];
};

const publishExpense = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Expense ID invalid');
  }
  const { mutate: publishExpense } = usePublishExpenseMutation({});
  publishExpense({ id });
};

export const loadExpenses = () => {
  const localItems = localStorage.getItem('expenseItems');
  if (localItems) {
    Object.assign(expenseItems, JSON.parse(localItems));
  } else {
    const { onResult } = useGetExpensesQuery();
    // TODO catch errors
    onResult((result) => {
      const items = result.data.expenses;
      const itemsNoDeleted = items.filter((item) => item.deleted === false);
      Object.assign(expenseItems, itemsNoDeleted);
      updateLocalStorage();
    });
  }
  loadCategories();
};

export const addExpense = async (expense: Expense) => {
  const { mutate: createExpense, onDone } = useAddExpenseMutation({});
  createExpense({
    amount: expense.amount,
    card: expense.card,
    date: expense.date,
    deleted: expense.deleted,
    note: expense.note,
    categoryID: expense.category.id,
  });

  return onDone((result) => {
    const expenseID = result.data?.createExpense?.id;
    expense.id = expenseID || '';
    expenseItems.push(new Expense(expense));
    updateLocalStorage();
    publishExpense(expenseID);
  });
};

export const editExpense = async (expense: Expense) => {
  if (!expense) {
    throw new Error('Expense does not exist');
  }

  // update on graph cms
  const { mutate: updateExpense, onDone } = useUpdateExpenseMutation({});
  updateExpense({
    id: expense.id,
    amount: expense.amount,
    card: expense.card,
    date: expense.date,
    deleted: expense.deleted,
    note: expense.note,
    categoryID: expense.category.id,
  });

  return onDone(() => {
    // update expense on local storage
    const oldExpense = getExpenseByID(expense.id);
    if (oldExpense) {
      copyExpense(
        expenseItems[expenseItems.indexOf(oldExpense)],
        expense
      );
      updateLocalStorage();
    }
    publishExpense(expense.id);
  });
};

export const deleteExpense = (expense: Expense) => {
  if (!expense) {
    throw new Error('Expense does not exist');
  }

  // update on graph cms
  expense.deleted = true;

  const { mutate: updateExpense, onDone } = useUpdateExpenseMutation({});
  updateExpense({
    id: expense.id,
    amount: expense.amount,
    card: expense.card,
    date: expense.date,
    deleted: expense.deleted,
    note: expense.note,
    categoryID: expense.category.id,
  });

  return onDone(() => {
    // remove from local storage
    expenseItems.splice(expenseItems.indexOf(expense), 1);
    updateLocalStorage();
    publishExpense(expense.id);
  });
};

initialize();
