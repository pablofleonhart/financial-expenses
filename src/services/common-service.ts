import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { loadCategories } from './category-service';
import { loadInvestments } from './investment-service';

const initializeServices = () => {
  provideApolloClient(apolloClient);
  setTimeout(() => {
    loadCategories();
    loadInvestments();
  }, 2000);
};

initializeServices();
