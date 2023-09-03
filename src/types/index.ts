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
