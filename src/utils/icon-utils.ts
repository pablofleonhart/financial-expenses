import { EXPENSE_CATEGORY } from '../types';

const categoryTypes: Record<string, any> = {
  [EXPENSE_CATEGORY.CLOTHES]: 'ph-t-shirt',
  [EXPENSE_CATEGORY.EDUCATION]: 'ph-student',
  [EXPENSE_CATEGORY.ELECTRONIC]: 'ph-desktop-tower',
  [EXPENSE_CATEGORY.FOOD]: 'ph-pizza',
  [EXPENSE_CATEGORY.GYM]: 'ph-barbell',
  [EXPENSE_CATEGORY.HOTEL]: 'ph-buildings',
  [EXPENSE_CATEGORY.HOUSE]: 'ph-armchair',
  [EXPENSE_CATEGORY.HOUSING]: 'ph-house-line',
  [EXPENSE_CATEGORY.INVESTMENT]: 'ph-currency-btc',
  [EXPENSE_CATEGORY.MARKET]: 'ph-shopping-cart',
  [EXPENSE_CATEGORY.PET]: 'ph-paw-print',
  [EXPENSE_CATEGORY.PHARMACY]: 'ph-pill',
  [EXPENSE_CATEGORY.PHONE]: 'ph-phone-call',
  [EXPENSE_CATEGORY.RECREATION]: 'ph-popcorn',
  [EXPENSE_CATEGORY.SALON]: 'ph-scissors',
  [EXPENSE_CATEGORY.SUBSCRIPTION]: 'ph-newspaper',
  [EXPENSE_CATEGORY.TRANSPORT]: 'ph-train',
  [EXPENSE_CATEGORY.TRAVEL]: 'ph-airplane',
  [EXPENSE_CATEGORY.VAPE]: 'ph-smiley-x-eyes',
};

export const getCategoryIcon = (categoryType: string) => {
  if (categoryType in categoryTypes) {
    return categoryTypes[categoryType];
  }
  return 'ph-warning-octagon';
};

export const getPaymentIcon = (card: boolean) => {
  return card ? 'ph-credit-card' : 'ph-coin-vertical';
};

export const getOrderIcon = (ascending: boolean) => {
  return ascending ? 'ph-caret-down' : 'ph-caret-up';
};

export const getRevenueTypeIcon = (type: string) => {
  if (type === 'income') {
    return 'ph-trend-up';
  }
  if (type === 'outcome') {
    return 'ph-trend-down';
  }
  return 'ph-minus';
};
