import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { loadCategories } from './category-service';
import { loadCurrencies } from './currency-service';
import { loadTransactions } from './transaction-service';
import { loadWallets } from './wallet-service';
import { loadUsers } from './user-service';

export async function loadInitialData() {
  await loadCurrencies();
  await loadCategories();
  await loadUsers();
}

function initializeServices() {
  provideApolloClient(apolloClient);
  setTimeout(() => {
    loadWallets();
    loadTransactions();
  }, 2000);
}

initializeServices();
