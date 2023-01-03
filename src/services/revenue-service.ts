import {
  useAddRevenueMutation,
  useGetRevenuesQuery,
  usePublishRevenueMutation,
  useUpdateRevenueMutation,
} from '../graphql/generated';
import { computed, reactive } from 'vue';
import { Revenue } from '../components/revenues/Revenue';
import { copyRevenue, sortList } from '../utils';

export const revenueItems: Array<Revenue> = reactive([]);
export const revenueSettings: Record<string, any> = reactive({});

const REVENUE_LIST_KEY = 'revenue-list';

const initializeData = () => {
  const localSettings = localStorage.getItem(REVENUE_LIST_KEY);

  if (localSettings) {
    Object.assign(revenueSettings, JSON.parse(localSettings));
  } else {
    Object.assign(revenueSettings, { ascending: false, column: 'date' });
  }
};

export const incomeSumBRL = computed<number>(() => {
  let result = 0;
  revenueItems.forEach((item) => {
    if (item.type === 'income' && item.currency === 'real') {
      result += item.amount;
    }
  });
  return result;
});

export const outcomeSumBRL = computed<number>(() => {
  let result = 0;
  revenueItems.forEach((item) => {
    if (item.type === 'outcome' && item.currency === 'real') {
      result += item.amount;
    }
  });
  return result;
});

export const incomeSumEUR = computed<number>(() => {
  let result = 0;
  revenueItems.forEach((item) => {
    if (item.type === 'income' && item.currency === 'euro') {
      result += item.amount;
    }
  });
  return result;
});

export const outcomeSumEUR = computed<number>(() => {
  let result = 0;
  revenueItems.forEach((item) => {
    if (item.type === 'outcome' && item.currency === 'euro') {
      result += item.amount;
    }
  });
  return result;
});

const updateLocalStorage = () => {
  localStorage.setItem('revenueItems', JSON.stringify(revenueItems));
};

const getRevenueByID = (id: string): Revenue | null => {
  if (!id) {
    return null;
  }
  return revenueItems.filter((item) => item.id === id)[0];
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
    Object.assign(revenueItems, JSON.parse(localItems));
  } else {
    const { onResult } = useGetRevenuesQuery();
    // TODO catch errors
    return onResult((result) => {
      const items = result.data.revenues;
      const itemsNoDeleted = items.filter((item) => item.deleted === false);
      Object.assign(revenueItems, itemsNoDeleted);
      updateLocalStorage();
    });
  }
  sortList(revenueItems, revenueSettings.column, revenueSettings.ascending);
};

export const addRevenue = async (revenue: Revenue) => {
  const { mutate: createRevenue, onDone } = useAddRevenueMutation({});
  createRevenue({
    amount: revenue.amount,
    date: revenue.date,
    description: revenue.description,
    type: revenue.type,
    bank: revenue.bank,
    currency: revenue.currency
  });

  return onDone((result) => {
    const revenueID = result.data?.createRevenue?.id;
    revenue.id = revenueID || '';
    revenueItems.push(revenue);
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
    currency: revenue.currency
  });

  return onDone(() => {
    // update revenue on local storage
    const oldRevenue = getRevenueByID(revenue.id);
    if (oldRevenue) {
      copyRevenue(revenueItems[revenueItems.indexOf(oldRevenue)], revenue);
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
    currency: revenue.currency
  });

  return onDone(() => {
    // remove from local storage
    revenueItems.splice(revenueItems.indexOf(revenue), 1);
    updateLocalStorage();
    publishRevenue(revenue.id);
  });
};

export const syncRevenues = () => {
  localStorage.removeItem('revenueItems');
  loadRevenues();
};

export const sortRevenues = (column: string) => {
  if (revenueSettings.column === column) {
    revenueSettings.ascending = !revenueSettings.ascending;
  } else {
    revenueSettings.column = column;
  }

  sortList(revenueItems, revenueSettings.column, revenueSettings.ascending);
  localStorage.setItem(REVENUE_LIST_KEY, JSON.stringify(revenueSettings));
};

initializeData();
