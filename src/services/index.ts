import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';

provideApolloClient(apolloClient);

export * from './auth-service';
export * from './category-service';
export * from './common-service';
export * from './expense-service';
export * from './revenue-service';
