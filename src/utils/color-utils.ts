import { EXPENSE_CATEGORY } from '../types';

const expenseCategoryColors: Record<string, any> = {
  [EXPENSE_CATEGORY.BARBER]: '#2166ac',
  [EXPENSE_CATEGORY.CLOTHES]: '#3761ab',
  [EXPENSE_CATEGORY.ELECTRONIC]: '#f4777f',
  [EXPENSE_CATEGORY.FOOD]: '#f46d43',
  [EXPENSE_CATEGORY.HOUSE]: '#de77ae',
  [EXPENSE_CATEGORY.MARKET]: '#93003a',
  [EXPENSE_CATEGORY.PET]: '#5681b9',
  [EXPENSE_CATEGORY.PHARMACY]: '#1b7837',
  [EXPENSE_CATEGORY.PHONE]: '#762a83',
  [EXPENSE_CATEGORY.RECREATION]: '#dd4c65',
  [EXPENSE_CATEGORY.SUBSCRIPTION]: '#be214d',
  [EXPENSE_CATEGORY.TRANSPORT]: '#bf812d',
  [EXPENSE_CATEGORY.VAPE]: '#b8e186',
};

export const getExpenseCategoryColor = (categoryType: string) => {
  if (categoryType in expenseCategoryColors) {
    return expenseCategoryColors[categoryType];
  }
  return '#000';
};
