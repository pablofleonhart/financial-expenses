import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';
import { loadCategories } from './category-service';

const initializeServices = () => {
  provideApolloClient(apolloClient);
  loadCategories();
};

initializeServices();
