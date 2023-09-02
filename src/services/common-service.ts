import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { loadCategories } from './category-service';
import { loadCurrencies } from './currency-service';
import { loadTransactions } from './transaction-service';
import { loadWallets } from './wallet-service';

const initializeServices = () => {
  loadCurrencies();

  provideApolloClient(apolloClient);
  setTimeout(() => {
    loadCategories();
    loadWallets();
    loadTransactions();
  }, 2000);
};

initializeServices();
