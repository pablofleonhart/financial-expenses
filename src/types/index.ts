export type MonthPeriod = {
  index: number;
  name: string;
  from: Date | string;
  to: Date | string;
};

export enum REVENUE_STATUS {
  OPEN = 0,
  DONE = 1,
}

export type RevenueStatus = {
  id: number;
  name: string;
};

export enum WISH_STATUS {
  OPEN = 0,
  DONE = 1,
}

export type WishStatus = {
  id: number;
  name: string;
};

export enum WALLET_TYPE {
  BALANCE = 0,
  INVESTMENT = 1,
  CREDIT = 2,
}

export type WalletType = {
  id: number;
  key: string;
  name: string;
};

export type PlaceType = {
  latitude: number;
  longitude: number;
};

export interface IExpenseFilter {
  period?: MonthPeriod;
}

export interface IBudgetFilter {
  targetDate: string;
  categoryID?: string;
}

export interface IBudgetSort {
  column: string;
  order: string;
}

export interface IExpenseFilter {
  startDate?: string;
  endDate?: string;
  categoryID?: string;
  travelID?: string;
  wishID?: string;
  paymentID?: string;
  userID?: string;
  isVariable?: boolean;
  isFullfiled?: boolean;
}

export interface IExpenseSort {
  column: string;
  order: string;
}

export type ExpenseAnalytics = {
  expenseCategoriesLabels: string[];
  expenseCategoriesValues: number[];
  expenseCategoriesColorValues: string[];
};
