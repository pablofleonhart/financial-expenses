export type MonthPeriod = {
  name: string;
  from: Date | string;
  to: Date | string;
};

export enum EXPENSE_CATEGORY {
  BARBER = 'barber',
  CLOTHES = 'clothes',
  ELECTRONIC = 'electronic',
  FOOD = 'food',
  HOUSE = 'house',
  MARKET = 'market',
  PET = 'pet',
  PHARMACY = 'pharmacy',
  PHONE = 'phone',
  RECREATION = 'recreation',
  SUBSCRIPTION = 'subscription',
  TRANSPORT = 'transport',
  TRAVEL = 'travel',
  VAPE = 'vape',
}

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
