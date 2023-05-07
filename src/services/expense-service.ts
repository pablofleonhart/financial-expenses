import { computed, reactive, ref } from 'vue';
import { Expense } from '../components/expenses/Expense';
import {
  useAddExpenseBudgetMutation,
  useAddExpenseMutation,
  useAddTravelExpenseMutation,
  useGetExpensesQuery,
  usePublishExpenseMutation,
  useUpdateExpenseBudgetMutation,
  useUpdateExpenseMutation,
  useUpdateTravelExpenseMutation,
} from '../graphql/generated';
import {
  copyExpense,
  getMonthYear,
  getExpenseCategoryColor,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  isDateInPeriod,
  sortList,
  getMonths,
  getPercentage,
} from '../utils';
import { MonthPeriod } from '../types';
import { editWallet, publishManyWallets } from './wallet-service';
import { Travel } from '../components/travels/Travel';

export let allExpenseItems: Array<Expense> = [];
export const filteredExpenseItems: Array<Expense> = reactive([]);
export const filteredExpenseBudgets: Array<Expense> = reactive([]);
export const expenseSettings: Record<string, any> = reactive({});
export const expenseBudgetSettings: Record<string, any> = reactive({});

export const expensesSum = computed(() => {
  const expensesSum: Record<string, any> = {};
  filteredExpenseItems.forEach((item) => {
    if (!item.budget) {
      const key = item.payment.currency;
      if (!(key in expensesSum)) {
        expensesSum[key] = 0;
      }
      expensesSum[key] += item.amount;
    }
  });

  const sortedArray = Object.entries(expensesSum).sort();
  return Object.fromEntries(sortedArray);
});

export const expensesBudgetSum = computed(() => {
  filteredExpenseItems.filter((item) => item.budget);
  const expensesSum: Record<string, any> = {};
  allExpenseItems.forEach((expense) => {
    if (expense.budget && isDateInPeriod(expense.date, selectedExpensePeriod)) {
      const key = expense.currency;
      if (!(key in expensesSum)) {
        expensesSum[key] = 0;
      }
      expensesSum[key] += expense.amount;
    }
  });

  const sortedArray = Object.entries(expensesSum).sort();
  return Object.fromEntries(sortedArray);
});

export const budgetExpenseItems = computed(() => {
  const result = filteredExpenseBudgets.filter(
    (item) => (!item.travel || item.travel.id == '') && item.budget
  );

  return result.filter((item) => {
    return isDateInPeriod(item.date, selectedExpensePeriod);
  });
});

const sortedCategories: any[] = reactive([]);
export let expenseCategoriesLabels: string[] = [];
export let expenseCategoriesValues: number[] = [];
export const expenseCategoriesCurrencies: number[] = [];
export let expenseCategoriesColorValues: string[] = [];

export const reloadCharts = ref(false);
export const showFixedExpense = ref<boolean>(false);
export const showVariablesExpense = ref<boolean>(false);
export const travelExpense = ref<Travel | null>(null);

const EXPENSE_LIST_KEY = 'expense-list';
const EXPENSE_BUDGET_LIST_KEY = 'expense-budget-list';
const EXPENSE_PERIOD = 'expense-period';

export const selectedTravelExpensesSum = computed(() => {
  const expensesSum: Record<string, any> = {};
  if (travelExpense.value) {
    filteredExpenseItems.forEach((item) => {
      const key = item.payment.currency;
      if (!(key in expensesSum)) {
        expensesSum[key] = 0;
      }
      expensesSum[key] += item.amount;
    });
  }

  return expensesSum;
});

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
  let localSettings = localStorage.getItem(EXPENSE_LIST_KEY);

  if (localSettings) {
    Object.assign(expenseSettings, JSON.parse(localSettings));
  } else {
    Object.assign(expenseSettings, { ascending: false, column: 'date' });
  }

  localSettings = localStorage.getItem(EXPENSE_BUDGET_LIST_KEY);

  if (localSettings) {
    Object.assign(expenseBudgetSettings, JSON.parse(localSettings));
  } else {
    Object.assign(expenseBudgetSettings, {
      ascending: false,
      column: 'amount',
    });
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

export const getExpenseByID = (id: string): Expense | null => {
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
  const loadExpensesPromise = new Promise((resolve) => {
    expensePeriods.forEach(async (period: MonthPeriod, index, array) => {
      const monthsItems = await loadMonthExpenses(period);
      monthsItems.forEach((item: Expense) => {
        allExpenseItems.push(copyExpense(item));
      });
      if (index === array.length - 1) {
        resolve(true);
      }
      setTimeout(() => {}, 1000);
    });
  });

  return loadExpensesPromise.then(() => {
    filterExpenses();
  });
};

export const addExpense = (expense: Expense) => {
  return new Promise((resolve) => {
    const { mutate: createExpense, onDone } = useAddExpenseMutation({});
    createExpense({
      amount: expense.amount,
      card: expense.card,
      date: expense.date,
      deleted: expense.deleted,
      note: expense.note,
      categoryID: expense.category.id,
      currency: expense.payment.currency,
      paymentID: expense.payment.id,
      variable: expense.variable,
      budget: expense.budget,
    });

    onDone(async (result) => {
      const expenseID = result.data?.createExpense?.id;
      expense.id = expenseID || '';
      allExpenseItems.push(new Expense(expense));
      filterExpenses();
      publishExpense(expenseID);
      await expenseAdded(expense);
      resolve(true);
    });
  });
};

export const addExpenseBudget = (expense: Expense) => {
  return new Promise((resolve) => {
    const { mutate: createExpense, onDone } = useAddExpenseBudgetMutation({});
    createExpense({
      amount: expense.amount,
      categoryID: expense.category.id,
      currency: expense.currency,
      date: selectedExpensePeriod.from,
    });

    onDone(async (result) => {
      const expenseID = result.data?.createExpense?.id;
      expense.id = expenseID || '';
      allExpenseItems.push(new Expense(expense));
      filterExpenseBudgets(selectedExpensePeriod);
      publishExpense(expenseID);
      resolve(true);
    });
  });
};

export const addTravelExpense = (expense: Expense) => {
  return new Promise((resolve) => {
    const { mutate: createExpense, onDone } = useAddTravelExpenseMutation({});
    createExpense({
      amount: expense.amount,
      date: expense.date,
      note: expense.note,
      categoryID: expense.category.id,
      currency: expense.payment.currency,
      paymentID: expense.payment.id,
      travelID: expense.travel.id,
    });

    onDone(async (result) => {
      const expenseID = result.data?.createExpense?.id;
      expense.id = expenseID || '';
      allExpenseItems.push(new Expense(expense));
      filterExpenses();
      publishExpense(expenseID);
      await expenseAdded(expense);
      resolve(true);
    });
  });
};

export const editExpense = async (expense: Expense) => {
  if (!expense) {
    throw new Error('Expense does not exist');
  }
  expense.budget = false;
  await expenseEdited(expense);

  return new Promise((resolve) => {
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
      paymentID: expense.payment.id,
      variable: expense.variable,
      budget: expense.budget,
    });

    onDone(() => {
      // update expense on local storage
      const oldExpense = getExpenseByID(expense.id);
      if (oldExpense) {
        const index = allExpenseItems.indexOf(oldExpense);
        allExpenseItems.splice(index, 1);
        allExpenseItems.push(expense);
        sortExpenses();
      }
      filterExpenses();
      publishExpense(expense.id);
      resolve(true);
    });
  });
};

export const editExpenseBudget = async (expense: Expense) => {
  if (!expense) {
    throw new Error('Expense does not exist');
  }

  return new Promise((resolve) => {
    const { mutate: updateExpense, onDone } = useUpdateExpenseBudgetMutation(
      {}
    );
    updateExpense({
      id: expense.id,
      amount: expense.amount,
      date: expense.date,
      deleted: expense.deleted,
      categoryID: expense.category.id,
      currency: expense.currency,
    });

    onDone(() => {
      // update expense on local storage
      const oldExpense = getExpenseByID(expense.id);
      if (oldExpense) {
        const index = allExpenseItems.indexOf(oldExpense);
        allExpenseItems.splice(index, 1);
        allExpenseItems.push(expense);
        sortExpenses();
      }
      filterExpenses();
      publishExpense(expense.id);
      resolve(true);
    });
  });
};

export const editTravelExpense = async (expense: Expense) => {
  if (!expense) {
    throw new Error('Expense does not exist');
  }
  expense.budget = false;
  await expenseEdited(expense);

  return new Promise((resolve) => {
    const { mutate: updateTravelExpense, onDone } =
      useUpdateTravelExpenseMutation({});
    updateTravelExpense({
      id: expense.id,
      amount: expense.amount,
      date: expense.date,
      note: expense.note,
      categoryID: expense.category.id,
      currency: expense.currency,
      paymentID: expense.payment.id,
      travelID: expense.travel.id,
    });

    onDone(() => {
      // update expense on local storage
      const oldExpense = getExpenseByID(expense.id);
      if (oldExpense) {
        const index = allExpenseItems.indexOf(oldExpense);
        allExpenseItems.splice(index, 1);
        allExpenseItems.push(expense);
        sortExpenses();
      }
      filterExpenses();
      publishExpense(expense.id);
      resolve(true);
    });
  });
};

export const deleteExpense = async (expense: Expense) => {
  if (!expense) {
    throw new Error('Expense does not exist');
  }

  return new Promise((resolve) => {
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
      paymentID: expense.payment.id,
      variable: expense.variable,
      budget: expense.budget,
    });

    onDone(async () => {
      // remove from local storage
      allExpenseItems.splice(allExpenseItems.indexOf(expense), 1);
      filterExpenses();
      publishExpense(expense.id);

      if (!expense.budget) {
        await expenseDeleted(expense);
      }
      resolve(true);
    });
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

export const sortExpenseBudgets = (column?: string) => {
  if (column) {
    if (expenseBudgetSettings.column === column) {
      expenseBudgetSettings.ascending = !expenseBudgetSettings.ascending;
    } else {
      expenseBudgetSettings.column = column;
    }
  }

  sortList(
    filteredExpenseBudgets,
    expenseBudgetSettings.column,
    expenseBudgetSettings.ascending
  );
  localStorage.setItem(
    EXPENSE_BUDGET_LIST_KEY,
    JSON.stringify(expenseBudgetSettings)
  );
};

export let expenseBudgetCategories: Record<string, any> = reactive({});

const loadExpenseCategories = () => {
  const categories: Record<
    string,
    { color: string; name: string; value: number }
  > = {};
  filteredExpenseItems.forEach((expense) => {
    if (!expense.budget && (!expense.travel || expense.travel.id == '')) {
      const categoryType = expense.category.type;
      if (!(categoryType in categories)) {
        categories[categoryType] = {
          color: getExpenseCategoryColor(categoryType),
          name: expense.category.name,
          value: 0,
        };
      }
      categories[categoryType].value += expense.amount;
    }
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

const loadExpenseBudgetCategories = (period: MonthPeriod) => {
  expenseBudgetCategories = {};

  allExpenseItems.forEach((expense) => {
    if (
      !expense.budget &&
      (!expense.travel || expense.travel.id == '') &&
      isDateInPeriod(expense.date, period)
    ) {
      const budgetCategoryType = `${expense.category.type}-${expense.currency}`;
      if (!(budgetCategoryType in expenseBudgetCategories)) {
        expenseBudgetCategories[budgetCategoryType] = 0;
      }
      expenseBudgetCategories[budgetCategoryType] += expense.amount;
    }
  });
};

const getBudgetPercentage = (expense: Expense) => {
  // @ts-ignore
  return getPercentage(expense.amount, expense.spentAmount);
};

const getSpentAmount = (expense: Expense) => {
  const categoryKey = `${expense.category.type}-${expense.currency}`;
  return expenseBudgetCategories[categoryKey] || 0;
};

const filterExpenseBudgets = (period: MonthPeriod | null) => {
  const filterPeriod = period || selectedExpensePeriod;
  loadExpenseBudgetCategories(filterPeriod);
  let result = allExpenseItems.filter(
    (item) => (!item.travel || item.travel.id == '') && item.budget
  );

  result = result.filter((item) => {
    return isDateInPeriod(item.date, filterPeriod);
  });

  result.map((expense) => {
    expense.spentAmount = getSpentAmount(expense);
    expense.budgetPercentage = getBudgetPercentage(expense);
  });

  filteredExpenseBudgets.splice(0);
  Object.assign(filteredExpenseBudgets, result);
  sortExpenseBudgets();
};

export const filterExpenses = (
  period: MonthPeriod | null = selectedExpensePeriod
) => {
  filterExpenseBudgets(period);
  let result: Expense[] = [];

  if (travelExpense.value) {
    result = allExpenseItems.filter(
      (item) =>
        item.travel &&
        item.travel.id === travelExpense.value?.id &&
        !item.budget
    );
  } else if (showFixedExpense.value && showVariablesExpense.value) {
    result = allExpenseItems.filter(
      (item) => (!item.travel || item.travel.id == '') && !item.budget
    );
  } else if (showFixedExpense.value) {
    result = allExpenseItems.filter(
      (item) =>
        (!item.travel || item.travel.id == '') && !item.variable && !item.budget
    );
  } else if (showVariablesExpense.value) {
    result = allExpenseItems.filter(
      (item) =>
        (!item.travel || item.travel.id == '') && item.variable && !item.budget
    );
  }

  if (period) {
    result = result.filter((item) => {
      return isDateInPeriod(item.date, period);
    });
    Object.assign(selectedExpensePeriod, period);
  }

  filteredExpenseItems.splice(0);
  Object.assign(filteredExpenseItems, result);
  sortExpenses();

  localStorage.setItem(EXPENSE_PERIOD, JSON.stringify(selectedExpensePeriod));
  loadExpenseCategories();
};

export const expenseAdded = async (expense: Expense) => {
  if (!expense || !expense.payment) {
    return;
  }
  expense.payment.amount -= expense.amount;
  await editWallet(expense.payment);
};

export const expenseEdited = async (expense: Expense) => {
  if (!expense || !expense.payment) {
    return;
  }

  const oldExpense = getExpenseByID(expense.id);

  if (!oldExpense) {
    return;
  }

  if (oldExpense?.payment.id === expense.payment.id) {
    expense.payment.amount += oldExpense?.amount - expense.amount;
    await editWallet(expense.payment);
  } else {
    oldExpense.payment.amount += oldExpense.amount;
    expense.payment.amount -= expense.amount;
    await editWallet(oldExpense.payment, false);
    await editWallet(expense.payment, false);
    publishManyWallets([oldExpense.payment.id, expense.payment.id]);
  }
};

export const expenseDeleted = async (expense: Expense) => {
  if (!expense || !expense.payment) {
    return;
  }
  expense.payment.amount += expense.amount;
  await editWallet(expense.payment);
};

initializeService();
