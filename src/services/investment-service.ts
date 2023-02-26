import { computed, reactive } from 'vue';
import { Investment } from '../components/investments/Investment';
import { useAddInvestmentMutation, useGetInvestmentsQuery, usePublishInvestmentMutation, useUpdateInvestmentMutation } from '../graphql/generated';
import { copyInvestment, sortList } from '../utils';

export const allInvestmentItems: Array<Investment> = reactive([]);
export const filteredInvestmentItems: Array<Investment> = reactive([]);
export const investmentSettings: Record<string, any> = reactive({});

// export const selectedRevenueStatus: RevenueStatus = reactive({
//   id: REVENUE_STATUS.OPEN,
//   name: 'Em aberto',
// });

// export const showRevenueActions = computed(
//   () => selectedRevenueStatus.id === REVENUE_STATUS.OPEN
// );

const INVESTMENT_LIST_KEY = 'investment-list';
const INVESTMENT_STATUS_KEY = 'investment-status';

// const loadSelectedStatus = () => {
//   const localSettings = localStorage.getItem(INVESTMENT_STATUS_KEY);

//   if (localSettings) {
//     Object.assign(selectedRevenueStatus, JSON.parse(localSettings));
//   }
// };

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(INVESTMENT_LIST_KEY);

  if (localSettings) {
    Object.assign(investmentSettings, JSON.parse(localSettings));
  } else {
    Object.assign(investmentSettings, { ascending: false, column: 'date' });
  }
};

const initializeData = () => {
  // loadSelectedStatus();
  loadSortSettings();
};

// const getAmount = (revenue: Investment) => {
//   return revenue.type === 'income' ? revenue.amount : revenue.amount * -1;
// };

// export const expectedSumBRL = computed<number>(() => {
//   let result = 0;
//   allInvestmentItems.forEach((item) => {
//     if (item.currency === 'real') {
//       result += getAmount(item);
//     }
//   });
//   return result;
// });

// export const currentSumBRL = computed<number>(() => {
//   let result = 0;
//   allInvestmentItems.forEach((item) => {
//     if (item.itemStatus === REVENUE_STATUS.DONE && item.currency === 'real') {
//       result += getAmount(item);
//     }
//   });
//   return result;
// });

// export const expectedSumEUR = computed<number>(() => {
//   let result = 0;
//   allInvestmentItems.forEach((item) => {
//     if (item.currency === 'euro') {
//       result += getAmount(item);
//     }
//   });
//   return result;
// });

// export const currentSumEUR = computed<number>(() => {
//   let result = 0;
//   allInvestmentItems.forEach((item) => {
//     if (item.itemStatus === REVENUE_STATUS.DONE && item.currency === 'euro') {
//       result += getAmount(item);
//     }
//   });
//   return result;
// });

const updateLocalStorage = () => {
  localStorage.setItem('investmentItems', JSON.stringify(allInvestmentItems));
};

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

export const loadInvestments = () => {
  const localItems = localStorage.getItem('investmentItems');
  if (localItems) {
    Object.assign(allInvestmentItems, JSON.parse(localItems));
    // filterInvestments();
  } else {
    const { onResult } = useGetInvestmentsQuery();
    // TODO catch errors
    return onResult((result) => {
      const items = result.data.investments;
      const itemsNoDeleted = items.filter((item) => item.deleted === false);
      Object.assign(allInvestmentItems, itemsNoDeleted);
      // filterInvestments();
      updateLocalStorage();
    });
  }
  sortList(allInvestmentItems, investmentSettings.column, investmentSettings.ascending);
};

export const addInvestment = async (investment: Investment) => {
  const { mutate: createInvestment, onDone } = useAddInvestmentMutation({});
  createInvestment({
    amount: investment.amount,
    broker: investment.broker,
    currency: investment.currency,
    holder: investment.holder
  });

  return onDone((result) => {
    const investmentID = result.data?.createInvestment?.id;
    investment.id = investmentID || '';
    allInvestmentItems.push(investment);
    updateLocalStorage();
    publishInvestment(investmentID);
    // filterInvestments();
  });
};

export const editInvestment = async (investment: Investment) => {
  if (!investment) {
    throw new Error('Investment does not exist');
  }

  // update on graph cms
  const { mutate: updateInvestment, onDone } = useUpdateInvestmentMutation({});
  updateInvestment({
    id: investment.id,
    amount: investment.amount,
    broker: investment.broker,
    currency: investment.currency,
    deleted: investment.deleted,
    holder: investment.holder
  });

  return onDone(() => {
    // update investment on local storage
    const oldInvestment = getInvestmentByID(investment.id);
    if (oldInvestment) {
      copyInvestment(
        allInvestmentItems[allInvestmentItems.indexOf(oldInvestment)],
        investment
      );
      updateLocalStorage();
    }
    publishInvestment(investment.id);
    // filterInvestments();
  });
};

export const deleteInvestment = (investment: Investment) => {
  if (!investment) {
    throw new Error('Investment does not exist');
  }

  // update on graph cms
  investment.deleted = true;

  const { mutate: updateInvestment, onDone } = useUpdateInvestmentMutation({});
  updateInvestment({
    id: investment.id,
    amount: investment.amount,
    broker: investment.broker,
    currency: investment.currency,
    deleted: investment.deleted,
    holder: investment.holder,
  });

  return onDone(() => {
    // remove from local storage
    allInvestmentItems.splice(allInvestmentItems.indexOf(investment), 1);
    updateLocalStorage();
    publishInvestment(investment.id);
    // filterInvestments();
  });
};

export const syncInvestments = () => {
  localStorage.removeItem('investmentItems');
  loadInvestments();
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

// export const filterInvestments = (
//   status: RevenueStatus = selectedRevenueStatus
// ) => {
//   const result = allInvestmentItems.filter((item) => {
//     return item.itemStatus === status.id;
//   });
//   filteredInvestmentItems.splice(0);
//   Object.assign(filteredInvestmentItems, result);
//   sortInvestments();
//   Object.assign(selectedRevenueStatus, status);
//   localStorage.setItem(
//     INVESTMENT_STATUS_KEY,
//     JSON.stringify(selectedRevenueStatus)
//   );
// };

// export const completeRevenue = (revenue: Revenue) => {
//   if (!revenue) {
//     return;
//   }
//   revenue.itemStatus = REVENUE_STATUS.DONE;
//   editInvestment(revenue);
//   filterInvestments();
// };

// export const reopenRevenue = (revenue: Revenue) => {
//   if (!revenue) {
//     return;
//   }
//   revenue.itemStatus = REVENUE_STATUS.OPEN;
//   editInvestment(revenue);
//   filterInvestments();
// };

initializeData();
