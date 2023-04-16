import { reactive } from 'vue';
import { Transaction } from '../components/transactions/Transaction';
import {
  useAddTransactionMutation,
  useGetTransactionsQuery,
  usePublishTransactionMutation,
  useUpdateTransactionMutation,
} from '../graphql/generated';
import { sortList } from '../utils';
import { updateWalletAmount } from './wallet-service';

export const allTransactionsItems: Array<Transaction> = reactive([]);
export const transactionSettings: Record<string, any> = reactive({});

const TRANSACTION_LIST_KEY = 'transaction-list';

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(TRANSACTION_LIST_KEY);

  if (localSettings) {
    Object.assign(transactionSettings, JSON.parse(localSettings));
  } else {
    Object.assign(transactionSettings, { ascending: false, column: 'date' });
  }
};

const initializeData = () => {
  loadSortSettings();
};

export const loadTransactions = () => {
  const { onResult } = useGetTransactionsQuery();
  onResult((result) => {
    Object.assign(allTransactionsItems, result.data.transactions);
  });
};

const getTransactionByID = (id: string): Transaction | null => {
  if (!id) {
    return null;
  }
  return allTransactionsItems.filter((item) => item.id === id)[0];
};

const publishTransaction = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Transaction ID invalid');
  }
  const { mutate: publishTransaction } = usePublishTransactionMutation({});
  publishTransaction({ id });
};

export const addTransaction = async (transaction: Transaction) => {
  const { mutate: createTransaction, onDone } = useAddTransactionMutation({});
  createTransaction({
    amountSent: transaction.amountSent,
    amountReceived: transaction.amountReceived,
    date: transaction.date,
    description: transaction.description,
    sourceID: transaction.source.id,
    targetID: transaction.target.id,
  });

  return onDone(async (result) => {
    const transactionID = result.data?.createTransaction?.id;
    transaction.id = transactionID || '';
    allTransactionsItems.push(transaction);
    publishTransaction(transactionID);
    await transactionAdded(transaction);
    // filterWallets();
  });
};

export const editTransaction = async (
  transaction: Transaction,
  publish = true
) => {
  if (!transaction) {
    throw new Error('Transaction does not exist');
  }

  return new Promise((resolve) => {
    const { mutate: updateTransaction, onDone } = useUpdateTransactionMutation(
      {}
    );
    updateTransaction({
      id: transaction.id,
      amountSent: transaction.amountSent,
      amountReceived: transaction.amountReceived,
      date: transaction.date,
      description: transaction.description,
      sourceID: transaction.source.id,
      targetID: transaction.target.id,
    });

    onDone(() => {
      const oldTransaction = getTransactionByID(transaction.id);
      if (oldTransaction) {
        const index = allTransactionsItems.indexOf(oldTransaction);
        allTransactionsItems.splice(index, 1);
        allTransactionsItems.push(transaction);
        sortTransactions();
      }
      if (publish) {
        publishTransaction(transaction.id);
      }
      // filterWallets();
      resolve(true);
    });
  });
};

export const sortTransactions = (column?: string) => {
  if (!allTransactionsItems.length) {
    return;
  }
  if (column) {
    if (transactionSettings.column === column) {
      transactionSettings.ascending = !transactionSettings.ascending;
    } else {
      transactionSettings.column = column;
    }
  }

  sortList(
    allTransactionsItems,
    transactionSettings.column,
    transactionSettings.ascending
  );
  localStorage.setItem(
    TRANSACTION_LIST_KEY,
    JSON.stringify(transactionSettings)
  );
};

const transactionAdded = async (transaction: Transaction) => {
  if (!transaction || !transaction.source || !transaction.target) {
    return;
  }
  transaction.source.amount -= transaction.amountSent;
  transaction.target.amount += transaction.amountReceived;
  await updateWalletAmount(transaction.source);
  setTimeout(async () => {
    await updateWalletAmount(transaction.target);
  }, 1000);
};

initializeData();
