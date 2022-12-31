import { syncCategories } from './category-service';
import { syncExpenses } from './expense-service';
import { syncRevenues } from './revenue-service';

export const syncAllData = () => {
  syncRevenues();
  syncCategories();
  syncExpenses();
};
