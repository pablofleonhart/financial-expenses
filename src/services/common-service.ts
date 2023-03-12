import { syncCategories } from './category-service';
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from '../lib/apollo';

export const syncAllData = () => {
  syncCategories();
};

const TIME_TO_SYNC = 28800000;

const checkLastSync = () => {
  const syncTime = localStorage.getItem('lastSync');

  if (syncTime) {
    const diffTime = new Date().getTime() - JSON.parse(syncTime);
    if (diffTime > TIME_TO_SYNC) {
      syncAllData();
      localStorage.setItem('lastSync', JSON.stringify(new Date().getTime()));
    }
  } else {
    syncAllData();
    localStorage.setItem('lastSync', JSON.stringify(new Date().getTime()));
  }
};

const initializeServices = () => {
  provideApolloClient(apolloClient);
  checkLastSync();
};

initializeServices();
