import { computed, reactive, ref } from 'vue';
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
  getMonthYear,
  getExpenseCategoryColor,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  isDateInPeriod,
  sortList,
  getMonths,
} from '../utils';
import { MonthPeriod } from '../types';

export let allExpenseItems: Array<Expense> = [];
export const filteredExpenseItems: Array<Expense> = reactive([]);
export const expenseSettings: Record<string, any> = reactive({});

export const expensesSum = computed(() => {
  let result = 0;
  filteredExpenseItems.forEach((item) => (result += item.amount));
  return result;
});

const sortedCategories: any[] = reactive([]);
export let expenseCategoriesLabels: string[] = [];
export let expenseCategoriesValues: number[] = [];
export let expenseCategoriesColorValues: string[] = [];

export const reloadCharts = ref(false);

const EXPENSE_LIST_KEY = 'expense-list';
const EXPENSE_PERIOD = 'expense-period';

export const expensePeriods: Array<MonthPeriod> = reactive([]);

export const selectedExpensePeriod: MonthPeriod = reactive({
  name: getMonthYear(),
  from: getFirstDayOfMonth(),
  to: getLastDayOfMonth(),
});

const loadSelectedPeriod = () => {
  const localSettings = localStorage.getItem(EXPENSE_PERIOD);

  if (localSettings) {
    Object.assign(selectedExpensePeriod, JSON.parse(localSettings));
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

const loadMonths = () => {
  Object.assign(expensePeriods, getMonths());
};

const initializeService = () => {
  loadSelectedPeriod();
  loadSortSettings();
  loadMonths();
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

const loadMonthExpenses = (month: MonthPeriod): Promise<any> => {
  return new Promise((resolve) => {
    const { onResult } = useGetExpensesQuery({
      startDate: month.from,
      endDate: month.to,
    });

    onResult((result) => {
      const items = result.data.expenses;
      const itemsNoDeleted = items.filter((item) => item.deleted === false);
      resolve(itemsNoDeleted);
    });
  });
};

export const loadExpenses = async (): Promise<void> => {
  allExpenseItems = [];
  const periodsPromise = new Promise((resolve) => {
    expensePeriods.forEach(async (period: MonthPeriod, index, array) => {
      const monthsItems = await loadMonthExpenses(period);
      allExpenseItems = [...allExpenseItems, ...monthsItems];
      if (index === array.length - 1) {
        resolve(true);
      }
    });
  });

  return periodsPromise.then(() => {
    filterExpenses();
    loadCategories();
  });
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
    publishExpense(expense.id);
  });
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

const loadExpenseCategories = () => {
  const categories: Record<
    string,
    { color: string; name: string; value: number }
  > = {};

  filteredExpenseItems.forEach((expense) => {
    if (!(expense.category.type in categories)) {
      categories[expense.category.type] = {
        color: getExpenseCategoryColor(expense.category.type),
        name: expense.category.name,
        value: 0,
      };
    }
    categories[expense.category.type].value += expense.amount;
  });

  sortedCategories.splice(0);
  Object.assign(
    sortedCategories,
    sortList(Object.values(categories), 'value', false)
  );

  expenseCategoriesLabels = Object.values(sortedCategories).map(
    (item) => item.name
  );
  expenseCategoriesValues = Object.values(sortedCategories).map(
    (item) => item.value
  );
  expenseCategoriesColorValues = Object.values(sortedCategories).map(
    (item) => item.color
  );
  reloadCharts.value = !reloadCharts.value;
};

export const topFiveExpenseCategories = computed(() => {
  return sortedCategories.slice(0, 5);
});

export const filterExpenses = (period: MonthPeriod = selectedExpensePeriod) => {
  const result = allExpenseItems.filter((item) => {
    return isDateInPeriod(item.date, period);
  });
  filteredExpenseItems.splice(0);
  Object.assign(filteredExpenseItems, result);
  sortExpenses();
  Object.assign(selectedExpensePeriod, period);
  localStorage.setItem(EXPENSE_PERIOD, JSON.stringify(selectedExpensePeriod));
  loadExpenseCategories();
};

initializeService();
