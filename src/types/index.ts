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
  VAPE = 'vape',
}
