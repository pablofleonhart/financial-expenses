import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { loadCategories } from './category-service';
import { loadWallets } from './wallet-service';

const initializeServices = () => {
  provideApolloClient(apolloClient);
  setTimeout(() => {
    loadCategories();
    loadWallets();
  }, 2000);
};

initializeServices();
