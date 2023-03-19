import { computed, reactive } from 'vue';
import { Investment } from '../components/investments/Investment';
import {
  useAddInvestmentMutation,
  useGetInvestmentsQuery,
  usePublishInvestmentMutation,
  usePublishManyInvestmentsMutation,
  useUpdateInvestmentMutation,
} from '../graphql/generated';
import { copyInvestment, sortList } from '../utils';

export const allInvestmentItems: Array<Investment> = reactive([]);
export const filteredInvestmentItems: Array<Investment> = reactive([]);
export const availableInvestments: Array<Investment> = reactive([]);
export const investmentSettings: Record<string, any> = reactive({});

const INVESTMENT_LIST_KEY = 'investment-list';

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(INVESTMENT_LIST_KEY);

  if (localSettings) {
    Object.assign(investmentSettings, JSON.parse(localSettings));
  } else {
    Object.assign(investmentSettings, { ascending: false, column: 'date' });
  }
};

const initializeData = () => {
  loadSortSettings();
};

export const investmentsSum = computed(() => {
  const investments: Record<string, any> = {};
  allInvestmentItems.forEach((item) => {
    if (item.available) {
      return;
    }
    const key = item.currency;
    if (!(key in investments)) {
      investments[key] = 0;
    }
    investments[key] += item.amount;
  });

  return investments;
});

export const balanceSum = computed(() => {
  const balances: Record<string, any> = {};
  allInvestmentItems.forEach((item) => {
    if (!item.available) {
      return;
    }
    const key = item.currency;
    if (!(key in balances)) {
      balances[key] = 0;
    }
    balances[key] += item.amount;
  });

  return balances;
});

const getInvestmentByID = (id: string): Investment | null => {
  if (!id) {
    return null;
  }
  return allInvestmentItems.filter((item) => item.id === id)[0];
};

const publishInvestment = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Investment ID invalid');
  }
  const { mutate: publishInvestmentMutate } = usePublishInvestmentMutation({});
  publishInvestmentMutate({ id });
};

export const publishManyInvestments = (ids: string[]): void => {
  const { mutate: publishMany } = usePublishManyInvestmentsMutation({});
  publishMany({ ids });
};

export const loadInvestments = async () => {
  const investmentsPromise = new Promise((resolve) => {
    const { onResult } = useGetInvestmentsQuery();
    onResult((result) => {
      const items = result.data.investments;
      availableInvestments.splice(0);
      allInvestmentItems.splice(0);
      items.forEach((item) => {
        if (item.deleted) {
          return;
        }
        if (item.available) {
          availableInvestments.push(copyInvestment(item));
        }
        allInvestmentItems.push(copyInvestment(item));
      });

      resolve(true);
    });
  });

  return investmentsPromise.then(() => {
    sortList(
      allInvestmentItems,
      investmentSettings.column,
      investmentSettings.ascending
    );
  });
};

export const addInvestment = async (investment: Investment) => {
  const { mutate: createInvestment, onDone } = useAddInvestmentMutation({});
  createInvestment({
    amount: investment.amount,
    broker: investment.broker,
    currency: investment.currency,
    holder: investment.holder,
    available: investment.available,
  });

  return onDone((result) => {
    const investmentID = result.data?.createInvestment?.id;
    investment.id = investmentID || '';
    allInvestmentItems.push(investment);
    publishInvestment(investmentID);
  });
};

export const editInvestment = async (
  investment: Investment,
  publish = true
) => {
  if (!investment) {
    throw new Error('Investment does not exist');
  }

  return new Promise((resolve) => {
    const { mutate: updateInvestment, onDone } = useUpdateInvestmentMutation(
      {}
    );
    updateInvestment({
      id: investment.id,
      amount: investment.amount,
      broker: investment.broker,
      currency: investment.currency,
      deleted: investment.deleted,
      holder: investment.holder,
      available: investment.available,
    });

    onDone(() => {
      const oldInvestment = getInvestmentByID(investment.id);
      if (oldInvestment) {
        const index = allInvestmentItems.indexOf(oldInvestment);
        allInvestmentItems.splice(index, 1);
        allInvestmentItems.push(investment);
        sortInvestments();
      }
      if (publish) {
        publishInvestment(investment.id);
      }
      resolve(true);
    });
  });
};

export const deleteInvestment = (investment: Investment) => {
  if (!investment) {
    throw new Error('Investment does not exist');
  }

  investment.deleted = true;

  const { mutate: updateInvestment, onDone } = useUpdateInvestmentMutation({});
  updateInvestment({
    id: investment.id,
    amount: investment.amount,
    broker: investment.broker,
    currency: investment.currency,
    deleted: investment.deleted,
    holder: investment.holder,
    available: investment.available,
  });

  return onDone(() => {
    allInvestmentItems.splice(allInvestmentItems.indexOf(investment), 1);
    publishInvestment(investment.id);
  });
};

export const sortInvestments = (column?: string) => {
  if (!allInvestmentItems.length) {
    return;
  }
  if (column) {
    if (investmentSettings.column === column) {
      investmentSettings.ascending = !investmentSettings.ascending;
    } else {
      investmentSettings.column = column;
    }
  }

  sortList(
    allInvestmentItems,
    investmentSettings.column,
    investmentSettings.ascending
  );
  localStorage.setItem(INVESTMENT_LIST_KEY, JSON.stringify(investmentSettings));
};

initializeData();
