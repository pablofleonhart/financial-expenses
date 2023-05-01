import { reactive } from 'vue';
import { Travel } from '../components/travels/Travel';
import {
  useGetTravelsQuery,
  usePublishTravelMutation,
} from '../graphql/generated';

export const allTravelItems: Array<Travel> = reactive([]);
export const travelSettings: Record<string, any> = reactive({});

const TRAVEL_LIST_KEY = 'travel-list';

const loadSortSettings = () => {
  const localSettings = localStorage.getItem(TRAVEL_LIST_KEY);

  if (localSettings) {
    Object.assign(travelSettings, JSON.parse(localSettings));
  } else {
    Object.assign(travelSettings, { ascending: false, column: 'date' });
  }
};

const initializeData = () => {
  loadSortSettings();
};

export const loadTravels = () => {
  const { onResult } = useGetTravelsQuery();
  onResult((result) => {
    Object.assign(allTravelItems, result.data.travels);
  });
};

const getTravelByID = (id: string): Travel | null => {
  if (!id) {
    return null;
  }
  return allTravelItems.filter((item) => item.id === id)[0];
};

const publishTravel = (id: string | undefined): void => {
  if (!id) {
    throw new Error('Travel ID invalid');
  }
  const { mutate: publishTravel } = usePublishTravelMutation({});
  publishTravel({ id });
};

// export const addTravel = async (transaction: Transaction) => {
//   const { mutate: createTravel, onDone } = useAddTravelMutation({});
//   createTravel({
//     amountSent: transaction.amountSent,
//     amountReceived: transaction.amountReceived,
//     date: transaction.date,
//     description: transaction.description,
//     sourceID: transaction.source.id,
//     targetID: transaction.target.id,
//   });

//   return onDone(async (result) => {
//     const transactionID = result.data?.createTravel?.id;
//     transaction.id = transactionID || '';
//     allTravelItems.push(transaction);
//     publishTransaction(transactionID);
//     await transactionAdded(transaction);
//     // filterWallets();
//   });
// };

// export const editTransaction = async (
//   transaction: Transaction,
//   publish = true
// ) => {
//   if (!transaction) {
//     throw new Error('Transaction does not exist');
//   }

//   return new Promise((resolve) => {
//     const { mutate: updateTransaction, onDone } = useUpdateTransactionMutation(
//       {}
//     );
//     updateTransaction({
//       id: transaction.id,
//       amountSent: transaction.amountSent,
//       amountReceived: transaction.amountReceived,
//       date: transaction.date,
//       description: transaction.description,
//       sourceID: transaction.source.id,
//       targetID: transaction.target.id,
//     });

//     onDone(() => {
//       const oldTransaction = getTravelByID(transaction.id);
//       if (oldTransaction) {
//         const index = allTravelItems.indexOf(oldTransaction);
//         allTravelItems.splice(index, 1);
//         allTravelItems.push(transaction);
//         sortTransactions();
//       }
//       if (publish) {
//         publishTransaction(transaction.id);
//       }
//       // filterWallets();
//       resolve(true);
//     });
//   });
// };

// export const sortTransactions = (column?: string) => {
//   if (!allTravelItems.length) {
//     return;
//   }
//   if (column) {
//     if (travelSettings.column === column) {
//       travelSettings.ascending = !travelSettings.ascending;
//     } else {
//       travelSettings.column = column;
//     }
//   }

//   sortList(
//     allTravelItems,
//     travelSettings.column,
//     travelSettings.ascending
//   );
//   localStorage.setItem(
//     TRAVEL_LIST_KEY,
//     JSON.stringify(travelSettings)
//   );
// };

// const transactionAdded = async (transaction: Transaction) => {
//   if (!transaction || !transaction.source || !transaction.target) {
//     return;
//   }
//   transaction.source.amount -= transaction.amountSent;
//   transaction.target.amount += transaction.amountReceived;
//   await updateWalletAmount(transaction.source);
//   setTimeout(async () => {
//     await updateWalletAmount(transaction.target);
//   }, 1000);
// };

initializeData();
