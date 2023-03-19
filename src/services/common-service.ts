import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { loadCategories } from './category-service';
import { loadInvestments } from './investment-service';

const initializeServices = () => {
  provideApolloClient(apolloClient);
  loadCategories();
  loadInvestments();
};

initializeServices();
