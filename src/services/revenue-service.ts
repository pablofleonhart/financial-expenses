import {
  useAddRevenueMutation,
  useGetRevenuesQuery,
  usePublishRevenueMutation,
  useUpdateRevenueMutation,
} from '../graphql/generated';
import { computed, reactive } from 'vue';
import { Revenue } from '../components/revenues/Revenue';
import { copyRevenue, sortList } from '../utils';
import { REVENUE_STATUS, RevenueStatus } from '../types';

export const allRevenueItems: Array<Revenue> = reactive([]);
export const filteredRevenueItems: Array<Revenue> = reactive([]);
export const revenueSettings: Record<string, any> = reactive({});

export const selectedRevenueStatus: RevenueStatus = reactive({
  id: REVENUE_STATUS.OPEN,
  name: 'Em aberto',
});

const REVENUE_LIST_KEY = 'revenue-list';
const REVENUE_STATUS_KEY = 'revenue-status';

const loadSelectedStatus = () => {
  const localSettings = localStorage.getItem(REVENUE_STATUS_KEY);

  if (localSettings) {
    Object.assign(selectedRevenueStatus, JSON.parse(localSettings));
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
  loadSelectedStatus();
  loadSortSettings();
};

export const incomeSumBRL = computed<number>(() => {
  let result = 0;
  allRevenueItems.forEach((item) => {
    if (item.type === 'income' && item.currency === 'real') {
      result += item.amount;
    }
  });
  return result;
});

export const outcomeSumBRL = computed<number>(() => {
  let result = 0;
  allRevenueItems.forEach((item) => {
    if (item.type === 'outcome' && item.currency === 'real') {
      result += item.amount;
    }
  });
  return result;
});

export const incomeSumEUR = computed<number>(() => {
  let result = 0;
  allRevenueItems.forEach((item) => {
    if (item.type === 'income' && item.currency === 'euro') {
      result += item.amount;
    }
  });
  return result;
});

export const outcomeSumEUR = computed<number>(() => {
  let result = 0;
  allRevenueItems.forEach((item) => {
    if (item.type === 'outcome' && item.currency === 'euro') {
      result += item.amount;
    }
  });
  return result;
});

const updateLocalStorage = () => {
  localStorage.setItem('revenueItems', JSON.stringify(allRevenueItems));
};

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
  const { mutate: publishRevenue } = usePublishRevenueMutation({});
  publishRevenue({ id });
};

export const loadRevenues = () => {
  const localItems = localStorage.getItem('revenueItems');
  if (localItems) {
    Object.assign(allRevenueItems, JSON.parse(localItems));
    filterRevenues();
  } else {
    const { onResult } = useGetRevenuesQuery();
    // TODO catch errors
    return onResult((result) => {
      const items = result.data.revenues;
      const itemsNoDeleted = items.filter((item) => item.deleted === false);
      Object.assign(allRevenueItems, itemsNoDeleted);
      filterRevenues();
      updateLocalStorage();
    });
  }
  sortList(allRevenueItems, revenueSettings.column, revenueSettings.ascending);
};

export const addRevenue = async (revenue: Revenue) => {
  const { mutate: createRevenue, onDone } = useAddRevenueMutation({});
  createRevenue({
    amount: revenue.amount,
    date: revenue.date,
    description: revenue.description,
    type: revenue.type,
    bank: revenue.bank,
    currency: revenue.currency,
    itemStatus: revenue.itemStatus,
  });

  return onDone((result) => {
    const revenueID = result.data?.createRevenue?.id;
    revenue.id = revenueID || '';
    allRevenueItems.push(revenue);
    updateLocalStorage();
    publishRevenue(revenueID);
  });
};

export const editRevenue = async (revenue: Revenue) => {
  if (!revenue) {
    throw new Error('Revenue does not exist');
  }

  // update on graph cms
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
  });

  return onDone(() => {
    // update revenue on local storage
    const oldRevenue = getRevenueByID(revenue.id);
    if (oldRevenue) {
      copyRevenue(
        allRevenueItems[allRevenueItems.indexOf(oldRevenue)],
        revenue
      );
      updateLocalStorage();
    }
    publishRevenue(revenue.id);
  });
};

export const deleteRevenue = (revenue: Revenue) => {
  if (!revenue) {
    throw new Error('Revenue does not exist');
  }

  // update on graph cms
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
  });

  return onDone(() => {
    // remove from local storage
    allRevenueItems.splice(allRevenueItems.indexOf(revenue), 1);
    updateLocalStorage();
    publishRevenue(revenue.id);
  });
};

export const syncRevenues = () => {
  localStorage.removeItem('revenueItems');
  loadRevenues();
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
  status: RevenueStatus = selectedRevenueStatus
) => {
  const result = allRevenueItems.filter((item) => {
    return item.itemStatus === status.id;
  });
  filteredRevenueItems.splice(0);
  Object.assign(filteredRevenueItems, result);
  sortRevenues();
  Object.assign(selectedRevenueStatus, status);
  localStorage.setItem(
    REVENUE_STATUS_KEY,
    JSON.stringify(selectedRevenueStatus)
  );
};

initializeData();
