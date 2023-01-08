import { computed, reactive } from 'vue';
import { Expense } from '../components/expenses/Expense';
import {
  useAddExpenseMutation,
  useGetExpensesQuery,
  usePublishExpenseMutation,
  useUpdateExpenseMutation,
} from '../graphql/generated';
import { loadCategories } from './category-service';
import {
  copyExpense,
  getCurrentMonthYear,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  isDateInPeriod,
  sortList,
} from '../utils';
import { MonthPeriod } from '../types';

export const allExpenseItems: Array<Expense> = reactive([]);
export const filteredExpenseItems: Array<Expense> = reactive([]);
export const expenseSettings: Record<string, any> = reactive({});

export const expensesSum = computed(() => {
  let result = 0;
  filteredExpenseItems.forEach((item) => (result += item.amount));
  return result;
});

const EXPENSE_LIST_KEY = 'expense-list';
const EXPENSE_PERIOD = 'expense-period';

export const selectedPeriod: MonthPeriod = reactive({
  name: getCurrentMonthYear(),
  from: getFirstDayOfMonth(),
  to: getLastDayOfMonth(),
});

const loadSelectedPeriod = () => {
  const localSettings = localStorage.getItem(EXPENSE_PERIOD);

  if (localSettings) {
    Object.assign(selectedPeriod, JSON.parse(localSettings));
  }
};

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(EXPENSE_LIST_KEY);

  if (localSettings) {
    Object.assign(expenseSettings, JSON.parse(localSettings));
  } else {
    Object.assign(expenseSettings, { ascending: false, column: 'date' });
  }
};

const initializeService = () => {
  loadSelectedPeriod();
  loadSortSettings();
};

const updateLocalStorage = () => {
  localStorage.setItem('expenseItems', JSON.stringify(allExpenseItems));
};

const getExpenseByID = (id: string): Expense | null => {
  if (!id) {
    return null;
  }
  return allExpenseItems.filter((item) => item.id === id)[0];
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
    Object.assign(allExpenseItems, JSON.parse(localItems));
    filterExpenses();
  } else {
    const { onResult } = useGetExpensesQuery();
    // TODO catch errors
    onResult((result) => {
      const items = result.data.expenses;
      const itemsNoDeleted = items.filter((item) => item.deleted === false);
      Object.assign(allExpenseItems, itemsNoDeleted);
      filterExpenses();
      updateLocalStorage();
    });
  }
  loadCategories();
};

export const addExpense = (expense: Expense) => {
  const { mutate: createExpense, onDone } = useAddExpenseMutation({});
  createExpense({
    amount: expense.amount,
    card: expense.card,
    date: expense.date,
    deleted: expense.deleted,
    note: expense.note,
    categoryID: expense.category.id,
    currency: expense.currency,
  });

  onDone((result) => {
    const expenseID = result.data?.createExpense?.id;
    expense.id = expenseID || '';
    allExpenseItems.push(new Expense(expense));
    filterExpenses();
    updateLocalStorage();
    publishExpense(expenseID);
  });
};

export const editExpense = (expense: Expense) => {
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
    currency: expense.currency,
  });

  onDone(() => {
    // update expense on local storage
    const oldExpense = getExpenseByID(expense.id);
    if (oldExpense) {
      copyExpense(
        allExpenseItems[allExpenseItems.indexOf(oldExpense)],
        expense
      );
      updateLocalStorage();
    }
    filterExpenses();
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
    currency: expense.currency,
  });

  onDone(() => {
    // remove from local storage
    allExpenseItems.splice(allExpenseItems.indexOf(expense), 1);
    filterExpenses();
    updateLocalStorage();
    publishExpense(expense.id);
  });
};

export const syncExpenses = () => {
  localStorage.removeItem('expenseItems');
  loadExpenses();
};

export const sortExpenses = (column?: string) => {
  if (column) {
    if (expenseSettings.column === column) {
      expenseSettings.ascending = !expenseSettings.ascending;
    } else {
      expenseSettings.column = column;
    }
  }

  sortList(
    filteredExpenseItems,
    expenseSettings.column,
    expenseSettings.ascending
  );
  localStorage.setItem(EXPENSE_LIST_KEY, JSON.stringify(expenseSettings));
};

export const filterExpenses = (period: MonthPeriod = selectedPeriod) => {
  const result = allExpenseItems.filter((item) => {
    return isDateInPeriod(item.date, period);
  });
  filteredExpenseItems.splice(0);
  Object.assign(filteredExpenseItems, result);
  sortExpenses();
  Object.assign(selectedPeriod, period);
  localStorage.setItem(EXPENSE_PERIOD, JSON.stringify(selectedPeriod));
};

initializeService();
