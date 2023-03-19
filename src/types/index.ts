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
  HOUSING = 'housing',
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

export const categoryName = {
  [EXPENSE_CATEGORY.BARBER]: 'Barbeiro',
  [EXPENSE_CATEGORY.CLOTHES]: 'Vestuário',
  [EXPENSE_CATEGORY.ELECTRONIC]: 'Eletrônicos',
  [EXPENSE_CATEGORY.FOOD]: 'Comida',
  [EXPENSE_CATEGORY.HOUSE]: 'Casa',
  [EXPENSE_CATEGORY.HOUSING]: 'Habitação',
  [EXPENSE_CATEGORY.MARKET]: 'Mercado',
  [EXPENSE_CATEGORY.PET]: 'Pet',
  [EXPENSE_CATEGORY.PHARMACY]: 'Farmácia',
  [EXPENSE_CATEGORY.PHONE]: 'Telefone',
  [EXPENSE_CATEGORY.RECREATION]: 'Lazer',
  [EXPENSE_CATEGORY.SUBSCRIPTION]: 'Assinaturas',
  [EXPENSE_CATEGORY.TRANSPORT]: 'Transporte',
  [EXPENSE_CATEGORY.TRAVEL]: 'Viagens',
  [EXPENSE_CATEGORY.VAPE]: 'Vape',
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
}

export type WalletType = {
  id: number;
  name: string;
};
