import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { loadCategories } from './category-service';
import { loadCurrencies } from './currency-service';
import { loadTransactions } from './transaction-service';
import { loadWallets } from './wallet-service';
import { loadUsers } from './user-service';
import { loadAccounts } from './account-service';

export async function loadInitialData() {
  await loadCurrencies();
  await loadCategories();
  await loadUsers();
  await loadAccounts();
}

function initializeServices() {
  // provideApolloClient(apolloClient);
  // setTimeout(() => {
  //   loadWallets();
  //   loadTransactions();
  // }, 2000);
}

initializeServices();
