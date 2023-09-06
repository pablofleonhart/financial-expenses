import { computed, reactive } from 'vue';
import { Expense } from '../components/expenses/Expense';
import {
  useAddExpenseBudgetMutation,
  useGetBudgetExpensesQuery,
  useGetExpensesQuery,
  usePublishExpenseMutation,
  useUpdateExpenseBudgetMutation,
} from '../graphql/generated';
import { MonthPeriod } from '../types';
import { copyExpense, getPercentage, sortList } from '../utils';
import { selectedExpensePeriod } from './expense-service';

const EXPENSE_BUDGET_LIST_KEY = 'expense-budget-list';

export const budgetExpenseItems: Array<Expense> = reactive([]);
export const expenseBudgetSettings: Record<string, any> = reactive({});
export let expenseBudgetCategories: Record<string, any> = reactive({});

const initializeService = () => {
  loadSortSettings();
};

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(EXPENSE_BUDGET_LIST_KEY);

  if (localSettings) {
    Object.assign(expenseBudgetSettings, JSON.parse(localSettings));
  } else {
    Object.assign(expenseBudgetSettings, {
      ascending: false,
      column: 'amount',
    });
  }
};

const publishExpense = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Expense ID invalid');
  }
  const { mutate: publishExpense } = usePublishExpenseMutation({});
  publishExpense({ id });
};

const loadExpenseItems = async (period: MonthPeriod): Promise<Expense[]> => {
  return new Promise((resolve) => {
    const { onResult } = useGetExpensesQuery({
      startDate: period.from,
      endDate: period.to,
    });

    onResult((result) => {
      const items = result.data.expenses;
      // @ts-ignore
      resolve(items.map((item) => copyExpense(item)));
    });
  });
};

const loadExpenseBudgetCategories = async (period: MonthPeriod) => {
  expenseBudgetCategories = {};

  const filteredExpenseItems: Expense[] = await loadExpenseItems(period);
  filteredExpenseItems.forEach((expense) => {
    const budgetcategoryID = `${expense.category.type}-${expense.currency}`;
    if (!(budgetcategoryID in expenseBudgetCategories)) {
      expenseBudgetCategories[budgetcategoryID] = 0;
    }
    expenseBudgetCategories[budgetcategoryID] += expense.amount;
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

// export const budgetExpenseItems = computed(() => {
//   const result = budgetItems.filter(
//     (item) => (!item.travel || item.travel.id == '') && item.budget
//   );

//   return result.filter((item) => {
//     return isDateInPeriod(item.date, selectedExpensePeriod);
//   });
// });

export const expensesBudgetSum = computed(() => {
  // filteredExpenseItems.filter((item) => item.budget);
  const expensesSum: Record<string, any> = {};
  budgetExpenseItems.forEach((expense) => {
    const key = expense.currency;
    if (!(key in expensesSum)) {
      expensesSum[key] = 0;
    }
    expensesSum[key] += expense.amount;
  });

  const sortedArray = Object.entries(expensesSum).sort();
  return Object.fromEntries(sortedArray);
});

export const loadBudgetItems = async (period: MonthPeriod) => {
  await loadExpenseBudgetCategories(period);

  return new Promise((resolve) => {
    const { onResult } = useGetBudgetExpensesQuery({
      startDate: period.from,
      endDate: period.to,
    });

    onResult((result) => {
      const items = result.data.expenses;
      const budgetsResult: Expense[] = [];
      // Object.assign(budgetExpenseItems, result.data.expenses);
      items.map((item) => {
        // @ts-ignore
        const expense = copyExpense(item);
        expense.spentAmount = getSpentAmount(expense);
        expense.budgetPercentage = getBudgetPercentage(expense);
        budgetsResult.push(expense);
      });

      budgetExpenseItems.splice(0);
      Object.assign(budgetExpenseItems, budgetsResult);
      sortExpenseBudgets();
      resolve(true);
    });
  });
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
    budgetExpenseItems,
    expenseBudgetSettings.column,
    expenseBudgetSettings.ascending
  );
  localStorage.setItem(
    EXPENSE_BUDGET_LIST_KEY,
    JSON.stringify(expenseBudgetSettings)
  );
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
      publishExpense(expenseID);
      await loadBudgetItems(selectedExpensePeriod);
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

    onDone(async () => {
      publishExpense(expense.id);
      await loadBudgetItems(selectedExpensePeriod);
      resolve(true);
    });
  });
};

initializeService();
