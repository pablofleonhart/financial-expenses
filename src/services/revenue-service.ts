import {
  useAddRevenueMutation,
  useGetRevenuesQuery,
  usePublishRevenueMutation,
  useUpdateRevenueMutation,
} from '../graphql/generated';
import { computed, reactive } from 'vue';
import { Revenue } from '../components/revenues/Revenue';
import {
  copyRevenue,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthYear,
  isDateInCurrentMonth,
  isDateInPeriod,
  overrideRevenue,
  sortList,
} from '../utils';
import { REVENUE_STATUS, RevenueStatus, MonthPeriod } from '../types';
import { editWallet, publishManyWallets } from './wallet-service';

export const allRevenueItems: Array<Revenue> = reactive([]);
export const filteredRevenueItems: Array<Revenue> = reactive([]);
export const revenueSettings: Record<string, any> = reactive({});

export const selectedRevenueStatus: RevenueStatus = reactive({
  id: REVENUE_STATUS.OPEN,
  name: 'Em aberto',
});

export const selectedRevenuePeriod: MonthPeriod = reactive({
  index: 0,
  name: getMonthYear(),
  from: getFirstDayOfMonth(),
  to: getLastDayOfMonth(),
});

export const showRevenueActions = computed(
  () => selectedRevenueStatus.id === REVENUE_STATUS.OPEN
);

const REVENUE_LIST_KEY = 'revenue-list';
const REVENUE_STATUS_KEY = 'revenue-status';
const REVENUE_PERIOD = 'revenue-period';

const loadSelectedPeriod = () => {
  const localSettings = localStorage.getItem(REVENUE_PERIOD);

  if (localSettings) {
    const objPeriod = JSON.parse(localSettings);

    if (!objPeriod.index) {
      objPeriod.index = new Date(objPeriod.from).getMonth() + 1;
    }
    Object.assign(selectedRevenuePeriod, objPeriod);
  }
};

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(REVENUE_LIST_KEY);

  if (localSettings) {
    Object.assign(revenueSettings, JSON.parse(localSettings));
  } else {
    Object.assign(revenueSettings, { ascending: false, column: 'date' });
  }
};

const initializeData = () => {
  loadSelectedPeriod();
  loadSortSettings();
};

export const monthlyIncomes = computed(() => {
  const incomes: Record<string, any> = {};
  allRevenueItems.forEach((item) => {
    if (item.type !== 'income' || !isDateInCurrentMonth(item.date)) {
      return;
    }
    const key = item.currency;
    if (!(key in incomes)) {
      incomes[key] = 0;
    }
    incomes[key] += item.amount;
  });

  return incomes;
});

export const monthlyOutcomes = computed(() => {
  const outcomes: Record<string, any> = {};
  allRevenueItems.forEach((item) => {
    if (item.type !== 'outcome' || !isDateInCurrentMonth(item.date)) {
      return;
    }
    const key = item.currency;
    if (!(key in outcomes)) {
      outcomes[key] = 0;
    }
    outcomes[key] += item.amount;
  });

  return outcomes;
});

const getAmount = (revenue: Revenue) => {
  return revenue.type === 'income' ? revenue.amount : revenue.amount * -1;
};

export const expectedSumBRL = computed<number>(() => {
  let result = 0;
  allRevenueItems.forEach((item) => {
    if (item.currency === 'real') {
      result += getAmount(item);
    }
  });
  return result;
});

export const currentSumBRL = computed<number>(() => {
  let result = 0;
  allRevenueItems.forEach((item) => {
    if (item.itemStatus === REVENUE_STATUS.DONE && item.currency === 'real') {
      result += getAmount(item);
    }
  });
  return result;
});

export const expectedSumEUR = computed<number>(() => {
  let result = 0;
  allRevenueItems.forEach((item) => {
    if (item.currency === 'euro') {
      result += getAmount(item);
    }
  });
  return result;
});

export const currentSumEUR = computed<number>(() => {
  let result = 0;
  allRevenueItems.forEach((item) => {
    if (item.itemStatus === REVENUE_STATUS.DONE && item.currency === 'euro') {
      result += getAmount(item);
    }
  });
  return result;
});

const getRevenueByID = (id: string): Revenue | null => {
  if (!id) {
    return null;
  }
  return allRevenueItems.filter((item) => item.id === id)[0];
};

const publishRevenue = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Revenue ID invalid');
  }
  const { mutate: publishRevenueMutate } = usePublishRevenueMutation({});
  publishRevenueMutate({ id });
};

export const loadRevenues = async () => {
  const revenuesPromise = new Promise((resolve) => {
    const { onResult } = useGetRevenuesQuery();
    onResult((result) => {
      const items = result.data.revenues;
      allRevenueItems.splice(0);
      items.forEach((item) => {
        if (item.deleted) {
          return;
        }
        allRevenueItems.push(copyRevenue(item));
      });

      filterRevenues();
      resolve(true);
    });
  });

  return revenuesPromise.then(() => {
    sortList(
      allRevenueItems,
      revenueSettings.column,
      revenueSettings.ascending
    );
  });
};

export const addRevenue = async (revenue: Revenue) => {
  return new Promise((resolve) => {
    const { mutate: createRevenue, onDone } = useAddRevenueMutation({});
    createRevenue({
      amount: revenue.amount,
      date: revenue.date,
      description: revenue.description,
      type: revenue.type,
      bank: revenue.bank,
      currency: revenue.currency,
      itemStatus: revenue.itemStatus,
      paymentID: revenue.payment.id,
      fullfilled: revenue.fullfilled,
    });

    onDone(async (result) => {
      const revenueID = result.data?.createRevenue?.id;
      revenue.id = revenueID || '';
      allRevenueItems.push(revenue);
      publishRevenue(revenueID);
      filterRevenues();
      resolve(true);
    });
  });
};

export const editRevenue = async (revenue: Revenue, updateBalance = true) => {
  if (!revenue) {
    throw new Error('Revenue does not exist');
  }

  if (updateBalance) {
    await revenueEdited(revenue);
  }
  return new Promise((resolve) => {
    const { mutate: updateRevenue, onDone } = useUpdateRevenueMutation({});
    updateRevenue({
      id: revenue.id,
      bank: revenue.bank,
      amount: revenue.amount,
      date: revenue.date,
      deleted: revenue.deleted,
      description: revenue.description,
      type: revenue.type,
      currency: revenue.currency,
      itemStatus: revenue.itemStatus,
      paymentID: revenue.payment.id,
      fullfilled: revenue.fullfilled,
    });

    onDone(async () => {
      // update revenue on local storage
      const oldRevenue = getRevenueByID(revenue.id);
      if (oldRevenue) {
        overrideRevenue(
          allRevenueItems[allRevenueItems.indexOf(oldRevenue)],
          revenue
        );
      }
      publishRevenue(revenue.id);
      filterRevenues();
      resolve(true);
    });
  });
};

export const deleteRevenue = async (revenue: Revenue) => {
  if (!revenue) {
    throw new Error('Revenue does not exist');
  }

  return new Promise((resolve) => {
    revenue.deleted = true;

    const { mutate: updateRevenue, onDone } = useUpdateRevenueMutation({});
    updateRevenue({
      id: revenue.id,
      bank: revenue.bank,
      amount: revenue.amount,
      date: revenue.date,
      deleted: revenue.deleted,
      description: revenue.description,
      type: revenue.type,
      currency: revenue.currency,
      itemStatus: revenue.itemStatus,
      paymentID: revenue.payment.id,
      fullfilled: revenue.fullfilled,
    });

    onDone(async () => {
      allRevenueItems.splice(allRevenueItems.indexOf(revenue), 1);
      publishRevenue(revenue.id);
      filterRevenues();
      await revenueDeleted(revenue);
      resolve(true);
    });
  });
};

export const sortRevenues = (column?: string) => {
  if (!filteredRevenueItems.length) {
    return;
  }
  if (column) {
    if (revenueSettings.column === column) {
      revenueSettings.ascending = !revenueSettings.ascending;
    } else {
      revenueSettings.column = column;
    }
  }

  sortList(
    filteredRevenueItems,
    revenueSettings.column,
    revenueSettings.ascending
  );
  localStorage.setItem(REVENUE_LIST_KEY, JSON.stringify(revenueSettings));
};

export const filterRevenues = (
  // status: RevenueStatus = selectedRevenueStatus
  period: MonthPeriod = selectedRevenuePeriod
) => {
  let result: Revenue[] = [];
  if (period) {
    result = allRevenueItems.filter((item) => {
      return isDateInPeriod(item.date, period);
    });
    Object.assign(selectedRevenuePeriod, period);
  }
  filteredRevenueItems.splice(0);
  Object.assign(filteredRevenueItems, result);
  sortRevenues();
  localStorage.setItem(REVENUE_PERIOD, JSON.stringify(selectedRevenuePeriod));
  // Object.assign(selectedRevenueStatus, status);
  // localStorage.setItem(
  //   REVENUE_STATUS_KEY,
  //   JSON.stringify(selectedRevenueStatus)
  // );
};

export const fulfillRevenue = async (revenue: Revenue) => {
  if (!revenue) {
    return;
  }
  revenue.itemStatus = REVENUE_STATUS.DONE;
  revenue.fullfilled = true;
  await editRevenue(revenue, false);
  filterRevenues();
  await revenueAdded(revenue);
};

export const reopenRevenue = async (revenue: Revenue) => {
  if (!revenue) {
    return;
  }
  revenue.itemStatus = REVENUE_STATUS.OPEN;
  revenue.fullfilled = false;
  await editRevenue(revenue, false);
  filterRevenues();
  await revenueDeleted(revenue);
};

const revenueAdded = async (revenue: Revenue) => {
  if (!revenue || !revenue.payment) {
    return;
  }
  let value = revenue.amount;
  if (revenue.type === 'outcome') {
    value *= -1;
  }
  revenue.payment.amount += value;
  await editWallet(revenue.payment);
};

const revenueEdited = async (revenue: Revenue) => {
  if (!revenue || !revenue.payment) {
    return;
  }

  const oldRevenue = getRevenueByID(revenue.id);

  if (!oldRevenue) {
    return;
  }

  if (oldRevenue?.payment.id === revenue.payment.id) {
    let diffValue = oldRevenue?.amount - revenue.amount;
    if (revenue.type === 'income') {
      diffValue *= -1;
    }
    revenue.payment.amount += diffValue;
    await editWallet(revenue.payment);
  } else {
    oldRevenue.payment.amount += oldRevenue.amount;
    revenue.payment.amount -= revenue.amount;
    await editWallet(oldRevenue.payment, false);
    await editWallet(revenue.payment, false);
    publishManyWallets([oldRevenue.payment.id, revenue.payment.id]);
  }
};

const revenueDeleted = async (revenue: Revenue) => {
  if (!revenue || !revenue.payment) {
    return;
  }
  let value = revenue.amount;
  if (revenue.type === 'income') {
    value *= -1;
  }
  revenue.payment.amount += value;
  await editWallet(revenue.payment);
};

initializeData();
