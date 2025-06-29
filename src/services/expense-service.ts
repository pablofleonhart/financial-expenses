// import { computed, reactive, ref } from 'vue';
// import { Expense } from '../components/expenses/Expense';
// import {
//   useAddExpenseMutation,
//   useAddTravelExpenseMutation,
//   useGetExpensesQuery,
//   usePublishExpenseMutation,
//   useUpdateExpenseMutation,
//   useUpdateTravelExpenseMutation,
// } from '../graphql/generated';
// import {
//   copyExpense,
//   getMonthYear,
//   getFirstDayOfMonth,
//   getLastDayOfMonth,
//   isDateInPeriod,
//   sortList,
//   getMonths,
// } from '../utils';
// import { MonthPeriod } from '../types';
// import { editWallet, publishManyWallets } from './wallet-service';
// import { Travel } from '../components/travels/Travel';
// import { getCategoryColorById } from './category-service';

import { computed, reactive, ref } from 'vue';
import { Expense } from '../components/expenses/Expense';
import { getAuthApi } from '../lib/axios';
import {
  ExpenseAnalytics,
  IExpenseFilter,
  IExpenseSort,
  MonthPeriod,
} from '../types';
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthYear,
  sortList,
} from '../utils';
import { Travel } from '../components/travels/Travel';
import { account } from './user-service';
import { getCategoryColorById, getCategoryNameById } from './category-service';

export const allExpenseItems: Array<Expense> = [];
export const filteredExpenseItems: Array<Expense> = reactive([]);
export const expenseSettings: Record<string, any> = reactive({});

// const selectedBusinessMonth = ref<BusinessMonth>(getCurrentBusinessMonth());

// export function getSelectedBusinessMonth(): BusinessMonth {
//   return selectedBusinessMonth.value;
// }

// export function setSelectedBusinessMonth(businessMonth: BusinessMonth) {
//   selectedBusinessMonth.value = businessMonth;
// }

export const expensesSum = ref<Record<string, number>>({});
export const fullfiledExpensesSum = ref<Record<string, number>>({});

const sortedCategories: any[] = reactive([]);
export const expenseCategoriesCurrencies: number[] = [];

export const reloadCharts = ref(false);
export const showFixedExpense = ref<boolean>(false);
export const showVariablesExpense = ref<boolean>(false);
export const travelExpense = ref<Travel | null>(null);

// const EXPENSE_LIST_KEY = 'expense-list';
// const EXPENSE_PERIOD = 'expense-period';

export const selectedTravelExpensesSum = computed(() => {
  // const expensesSum: Record<string, any> = {};
  // if (travelExpense.value) {
  //   filteredExpenseItems.forEach((item) => {
  //     const key = item.payment.currency;
  //     if (!(key in expensesSum)) {
  //       expensesSum[key] = 0;
  //     }
  //     expensesSum[key] += item.amount;
  //   });
  // }

  // return expensesSum;
  return 0;
});

export const expensePeriods: Array<MonthPeriod> = reactive([]);

export const selectedExpensePeriod: MonthPeriod = reactive({
  index: 0,
  name: getMonthYear(),
  from: getFirstDayOfMonth(),
  to: getLastDayOfMonth(),
});

// const loadSelectedPeriod = () => {
//   const localSettings = localStorage.getItem(EXPENSE_PERIOD);

//   if (localSettings) {
//     const objPeriod = JSON.parse(localSettings);

//     if (!objPeriod.index) {
//       objPeriod.index = new Date(objPeriod.from).getMonth() + 1;
//     }
//     Object.assign(selectedExpensePeriod, objPeriod);
//   }
// };

// const loadSortSettings = () => {
//   const localSettings = localStorage.getItem(EXPENSE_LIST_KEY);

//   if (localSettings) {
//     Object.assign(expenseSettings, JSON.parse(localSettings));
//   } else {
//     Object.assign(expenseSettings, { ascending: false, column: 'date' });
//   }
// };

// const loadMonths = () => {
//   Object.assign(expensePeriods, getMonths());
// };

// const initializeService = () => {
//   loadSelectedPeriod();
//   loadSortSettings();
//   loadMonths();
// };

// const publishExpense = (id: string | undefined): void => {
//   if (!id) {
//     throw new Error('Expense ID invalid');
//   }
//   const { mutate: publishExpense } = usePublishExpenseMutation({});
//   publishExpense({ id });
// };

// const loadMonthExpenses = (month: MonthPeriod): Promise<any> => {
//   return new Promise((resolve) => {
//     const { onResult } = useGetExpensesQuery({
//       startDate: month.from,
//       endDate: month.to,
//     });

//     onResult((result) => {
//       const items = result.data.expenses;
//       const itemsNoDeleted = items.filter((item) => item.deleted === false);
//       resolve(itemsNoDeleted);
//     });
//   });
// };

// export const loadExpenses = async (): Promise<void> => {
//   allExpenseItems = [];
//   const loadExpensesPromise = new Promise((resolve) => {
//     expensePeriods.forEach(async (period: MonthPeriod, index, array) => {
//       setTimeout(async () => {
//         const monthsItems = await loadMonthExpenses(period);
//         monthsItems.forEach((item: Expense) => {
//           allExpenseItems.push(copyExpense(item));
//         });
//         if (index === array.length - 1) {
//           resolve(true);
//         }
//       }, 500);
//     });
//   });

//   return loadExpensesPromise.then(() => {
//     filterExpenses();
//   });
// };

// export const addExpense = (expense: Expense) => {
//   return new Promise((resolve) => {
//     const { mutate: createExpense, onDone } = useAddExpenseMutation({});
//     createExpense({
//       amount: expense.amount,
//       card: expense.card,
//       date: expense.date,
//       deleted: expense.deleted,
//       note: expense.note,
//       categoryID: expense.category.id,
//       currency: expense.payment.currency,
//       paymentID: expense.payment.id,
//       variable: expense.variable,
//       budget: expense.budget,
//     });

//     onDone(async (result) => {
//       const expenseID = result.data?.createExpense?.id;
//       expense.id = expenseID || '';
//       allExpenseItems.push(new Expense(expense));
//       filterExpenses();
//       publishExpense(expenseID);
//       await expenseAdded(expense);
//       resolve(true);
//     });
//   });
// };

export const addTravelExpense = (expense: Expense) => {
  console.error('need to implement');
};
//   return new Promise((resolve) => {
//     const { mutate: createExpense, onDone } = useAddTravelExpenseMutation({});
//     createExpense({
//       amount: expense.amount,
//       date: expense.date,
//       note: expense.note,
//       categoryID: expense.category.id,
//       currency: expense.payment.currency,
//       paymentID: expense.payment.id,
//       travelID: expense.travel.id,
//     });

//     onDone(async (result) => {
//       const expenseID = result.data?.createExpense?.id;
//       expense.id = expenseID || '';
//       allExpenseItems.push(new Expense(expense));
//       filterExpenses();
//       publishExpense(expenseID);
//       await expenseAdded(expense);
//       resolve(true);
//     });
//   });
// };

// export const editExpense = async (expense: Expense) => {
//   if (!expense) {
//     throw new Error('Expense does not exist');
//   }
//   expense.budget = false;
//   await expenseEdited(expense);

//   return new Promise((resolve) => {
//     const { mutate: updateExpense, onDone } = useUpdateExpenseMutation({});
//     updateExpense({
//       id: expense.id,
//       amount: expense.amount,
//       card: expense.card,
//       date: expense.date,
//       deleted: expense.deleted,
//       note: expense.note,
//       categoryID: expense.category.id,
//       currency: expense.currency,
//       paymentID: expense.payment.id,
//       variable: expense.variable,
//       budget: expense.budget,
//     });

//     onDone(() => {
//       // update expense on local storage
//       const oldExpense = getExpenseByID(expense.id);
//       if (oldExpense) {
//         const index = allExpenseItems.indexOf(oldExpense);
//         allExpenseItems.splice(index, 1);
//         allExpenseItems.push(expense);
//         sortExpenses();
//       }
//       filterExpenses();
//       publishExpense(expense.id);
//       resolve(true);
//     });
//   });
// };

export const editTravelExpense = async (expense: Expense) => {
  console.error('need to implement');
};
//   if (!expense) {
//     throw new Error('Expense does not exist');
//   }
//   expense.budget = false;
//   await expenseEdited(expense);

//   return new Promise((resolve) => {
//     const { mutate: updateTravelExpense, onDone } =
//       useUpdateTravelExpenseMutation({});
//     updateTravelExpense({
//       id: expense.id,
//       amount: expense.amount,
//       date: expense.date,
//       note: expense.note,
//       categoryID: expense.category.id,
//       currency: expense.currency,
//       paymentID: expense.payment.id,
//       travelID: expense.travel.id,
//     });

//     onDone(() => {
//       // update expense on local storage
//       const oldExpense = getExpenseByID(expense.id);
//       if (oldExpense) {
//         const index = allExpenseItems.indexOf(oldExpense);
//         allExpenseItems.splice(index, 1);
//         allExpenseItems.push(expense);
//         sortExpenses();
//       }
//       filterExpenses();
//       publishExpense(expense.id);
//       resolve(true);
//     });
//   });
// };

// export const deleteExpense = async (expense: Expense) => {
//   if (!expense) {
//     throw new Error('Expense does not exist');
//   }

//   return new Promise((resolve) => {
//     expense.deleted = true;

//     const { mutate: updateExpense, onDone } = useUpdateExpenseMutation({});
//     updateExpense({
//       id: expense.id,
//       amount: expense.amount,
//       card: expense.card,
//       date: expense.date,
//       deleted: expense.deleted,
//       note: expense.note,
//       categoryID: expense.category.id,
//       currency: expense.currency,
//       paymentID: expense.payment.id,
//       variable: expense.variable,
//       budget: expense.budget,
//     });

//     onDone(async () => {
//       // remove from local storage
//       allExpenseItems.splice(allExpenseItems.indexOf(expense), 1);
//       filterExpenses();
//       publishExpense(expense.id);

//       if (!expense.budget) {
//         await expenseDeleted(expense);
//       }
//       resolve(true);
//     });
//   });
// };

export function sortExpenses(
  expenseItems: Expense[],
  sort: IExpenseSort = {
    column: 'date',
    order: 'desc',
  },
) {
  sortList(expenseItems, sort.column, sort.order === 'asc');
  // if (column) {
  //   if (expenseSettings.column === column) {
  //     expenseSettings.ascending = !expenseSettings.ascending;
  //   } else {
  //     expenseSettings.column = column;
  //   }
  // }
  // sortList(
  //   filteredExpenseItems,
  //   expenseSettings.column,
  //   expenseSettings.ascending,
  // );
  // localStorage.setItem(EXPENSE_LIST_KEY, JSON.stringify(expenseSettings));
}

// const loadExpenseCategories = () => {
//   const categories: Record<
//     string,
//     { color: string; name: string; value: number }
//   > = {};
//   filteredExpenseItems.forEach((expense) => {
//     if (!expense.budget && (!expense.travel || expense.travel.id == '')) {
//       const categoryID = expense.category.type;
//       if (!(categoryID in categories)) {
//         categories[categoryID] = {
//           color: getCategoryColorById(categoryID),
//           name: expense.category.name,
//           value: 0,
//         };
//       }
//       categories[categoryID].value += expense.amount;
//     }
//   });

//   sortedCategories.splice(0);
//   Object.assign(
//     sortedCategories,
//     sortList(Object.values(categories), 'value', false),
//   );

//   expenseCategoriesLabels = Object.values(sortedCategories).map(
//     (item) => item.name,
//   );
//   expenseCategoriesValues = Object.values(sortedCategories).map(
//     (item) => item.value,
//   );
//   expenseCategoriesColorValues = Object.values(sortedCategories).map(
//     (item) => item.color,
//   );
//   reloadCharts.value = !reloadCharts.value;
// };

export const topFiveExpenseCategories = computed(() => {
  return sortedCategories.slice(0, 5);
});

export const filterExpenses = (
  period: MonthPeriod | null = selectedExpensePeriod,
) => {};
//   // filterExpenseBudgets(period);
//   let result: Expense[] = [];

//   if (travelExpense.value) {
//     result = allExpenseItems.filter(
//       (item) =>
//         item.travel &&
//         item.travel.id === travelExpense.value?.id &&
//         !item.budget,
//     );
//   } else if (showFixedExpense.value && showVariablesExpense.value) {
//     result = allExpenseItems.filter(
//       (item) => (!item.travel || item.travel.id == '') && !item.budget,
//     );
//   } else if (showFixedExpense.value) {
//     result = allExpenseItems.filter(
//       (item) =>
//         (!item.travel || item.travel.id == '') &&
//         !item.variable &&
//         !item.budget,
//     );
//   } else if (showVariablesExpense.value) {
//     result = allExpenseItems.filter(
//       (item) =>
//         (!item.travel || item.travel.id == '') && item.variable && !item.budget,
//     );
//   }

//   if (period) {
//     result = result.filter((item) => {
//       return isDateInPeriod(item.date, period);
//     });
//     Object.assign(selectedExpensePeriod, period);
//   }

//   filteredExpenseItems.splice(0);
//   Object.assign(filteredExpenseItems, result);
//   sortExpenses();

//   localStorage.setItem(EXPENSE_PERIOD, JSON.stringify(selectedExpensePeriod));
//   loadExpenseCategories();
// };

// export const expenseAdded = async (expense: Expense) => {
//   if (!expense || !expense.payment) {
//     return;
//   }
//   expense.payment.amount -= expense.amount;
//   await editWallet(expense.payment);
// };

// export const expenseEdited = async (expense: Expense) => {
//   if (!expense || !expense.payment) {
//     return;
//   }

//   const oldExpense = getExpenseByID(expense.id);

//   if (!oldExpense) {
//     return;
//   }

//   if (oldExpense?.payment.id === expense.payment.id) {
//     expense.payment.amount += oldExpense?.amount - expense.amount;
//     await editWallet(expense.payment);
//   } else {
//     oldExpense.payment.amount += oldExpense.amount;
//     expense.payment.amount -= expense.amount;
//     await editWallet(oldExpense.payment, false);
//     await editWallet(expense.payment, false);
//     publishManyWallets([oldExpense.payment.id, expense.payment.id]);
//   }
// };

// export const expenseDeleted = async (expense: Expense) => {
//   if (!expense || !expense.payment) {
//     return;
//   }
//   expense.payment.amount += expense.amount;
//   await editWallet(expense.payment);
// };

// initializeService();

// export const loadExpenses = async () => {
//   try {
//     const response = await api.get('/expenses');
//     allExpenseItems.splice(0);
//     Object.assign(allExpenseItems, response.data.expenses);
//   } catch (error) {
//     console.error('Not able to load expenses');
//   }
// };

async function getExpenseSumByCurrency(filterData: IExpenseFilter) {
  try {
    const response = await getAuthApi().post('/expenses/currencies', {
      ...filterData,
    });
    return response.data;
  } catch (error) {
    console.error('Not able to load expenses sum by currencies');
  }
}

export async function getExpenses(filterData: IExpenseFilter) {
  try {
    const response = await getAuthApi().post('/expenses', { ...filterData });
    const expenses = response.data.expenses;

    expensesSum.value = await getExpenseSumByCurrency(filterData);
    fullfiledExpensesSum.value = await getExpenseSumByCurrency({
      ...filterData,
      isFullfiled: true,
    });
    // expensesSum.value = expenses.reduce(
    //   (sum: number, item: Expense) => sum + item.amount,
    //   0,
    // );
    // fullfiledExpensesSum.value = expenses
    //   .filter((expense: Expense) => expense.fullfiledAt)
    //   .reduce((sum: number, item: Expense) => sum + item.amount, 0);

    return expenses;
  } catch (error) {
    console.error('Not able to load expenses');
  }
}

export async function loadExpenseCategories(
  filterData: IExpenseFilter,
): Promise<ExpenseAnalytics | undefined> {
  try {
    const response = await getAuthApi().post(
      '/expenses/categories',
      filterData,
    );

    const expenseCategoriesLabels: string[] = [];
    const expenseCategoriesValues: number[] = [];
    const expenseCategoriesColorValues: string[] = [];

    response.data.forEach((item: any) => {
      expenseCategoriesLabels.push(getCategoryNameById(item.category_id));
      expenseCategoriesValues.push(item._sum.amount);
      expenseCategoriesColorValues.push(getCategoryColorById(item.category_id));
    });

    return {
      expenseCategoriesLabels,
      expenseCategoriesValues,
      expenseCategoriesColorValues,
    };
  } catch (error) {
    console.error('Not able to load expense categories:', filterData);
  }
}

export async function addExpense(expense: Expense) {
  try {
    expense.authorID = account.id;
    await getAuthApi().post('/expenses/new', expense);
  } catch (error) {
    console.error('Not able to add expense:', expense);
  }
}

export async function editExpense(expense: Expense) {
  try {
    expense.authorID = account.id;
    await getAuthApi().post(`/expenses/${expense.id}`, expense);
  } catch (error) {
    console.error('Not able to edit expense:', expense);
  }
}

export async function fullfilExpense(expense: Expense) {
  try {
    await getAuthApi().post(`/expenses/fullfil/${expense.id}`);
  } catch (error) {
    console.error('Not able to fullfil expense:', expense);
  }
}

export async function deleteExpense(expense: Expense) {
  try {
    await getAuthApi().post(`/expenses/delete/${expense.id}`, expense);
  } catch (error) {
    console.error('Not able to delete expense:', expense);
  }
}

export const getExpenseByID = (id: string): Expense | null => {
  if (!id) {
    return null;
  }
  return allExpenseItems.filter((item) => item.id === id)[0];
};
