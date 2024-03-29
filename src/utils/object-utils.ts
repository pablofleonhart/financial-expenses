import { Author } from '../components/user/Author';
import { Category } from '../components/categories/Category';
import { Expense } from '../components/expenses/Expense';
import { Wallet } from '../components/wallets/Wallet';
import { Revenue } from '../components/revenues/Revenue';
import { Wish } from '../components/wishes/Wish';
import { dateToString } from './date-utils';
import { Transaction } from '../components/transactions/Transaction';
import { Travel } from '../components/travels/Travel';

const copyCategory = (source: any) => {
  if (!source) {
    return new Category();
  }
  return new Category({
    id: source.id,
    name: source.name,
    type: source.type,
    icon: source.icon,
    color: source.color,
  });
};

const overrideCategory = (target: Category, source: Category) => {
  target.id = source.id;
  target.name = source.name;
  target.type = source.type;
};

export const copyExpense = (source: Expense) => {
  return new Expense({
    id: source.id,
    amount: source.amount,
    card: source.card,
    currency: source.currency,
    date: source.date,
    deleted: source.deleted,
    note: source.note,
    category: copyCategory(source.category),
    author: new Author(),
    payment: copyWallet(source.payment),
    variable: source.variable,
    budget: source.budget,
    travel: copyTravel(source.travel),
  });
};

export const overrideExpense = (target: Expense, source: Expense) => {
  target.id = source.id;
  target.amount = source.amount;
  target.card = source.card;
  target.date = source.date;
  target.deleted = source.deleted;
  target.note = source.note;
  overrideCategory(target.category, source.category);
  overrideWallet(target.payment, source.payment);
  target.variable = source.variable;
  target.budget = source.budget;
  overrideTravel(target.travel, source.travel);
};

export const copyRevenue = (source: any) => {
  return new Revenue({
    id: source.id,
    amount: source.amount,
    bank: source.bank,
    currency: source.currency,
    date: source.date,
    deleted: source.deleted,
    description: source.description,
    type: source.type,
    itemStatus: source.itemStatus,
    payment: copyWallet(source.payment),
    fullfilled: source.fullfilled,
  });
};

export const overrideRevenue = (target: Revenue, source: Revenue) => {
  target.id = source.id;
  target.amount = source.amount;
  target.bank = source.bank;
  target.currency = source.currency;
  target.date = source.date;
  target.deleted = source.deleted;
  target.description = source.description;
  target.type = source.type;
  target.itemStatus = source.itemStatus;
  target.fullfilled = source.fullfilled;
};

export const copyWallet = (source: any) => {
  if (!source) {
    return new Wallet();
  }
  return new Wallet({
    id: source.id,
    amount: source.amount,
    broker: source.broker,
    currency: source.currency,
    deleted: source.deleted,
    holder: source.holder,
    type: source.type,
  });
};

export const overrideWallet = (source: Wallet, target: Wallet) => {
  target.id = source.id;
  target.amount = source.amount;
  target.broker = source.broker;
  target.currency = source.currency;
  target.deleted = source.deleted;
  target.holder = source.holder;
  target.type = source.type;
};

export const copyWish = (source: Wish) => {
  return new Wish({
    id: source.id,
    amount: source.amount,
    authorID: source.authorID,
    categoryID: source.categoryID,
    currencyID: source.currencyID,
    deletedAt: source.deletedAt,
    description: source.description,
    fullfiledAt: source.fullfiledAt,
  });
};

export const overrideWish = (target: Wish, source: Wish) => {
  target.id = source.id;
  target.amount = source.amount;
  target.authorID = source.authorID;
  target.categoryID = source.categoryID;
  target.currencyID = source.currencyID;
  target.deletedAt = source.deletedAt;
  target.description = source.description;
  target.fullfiledAt = source.fullfiledAt;
};

export const copyTransaction = (transaction: any) => {
  return new Transaction({
    id: transaction.id,
    amountSent: transaction.amountSent,
    amountReceived: transaction.amountReceived,
    date: transaction.date,
    description: transaction.description,
    source: copyWallet(transaction.source),
    target: copyWallet(transaction.target),
  });
};

export const overrideTransaction = (
  targetTransaction: Transaction,
  sourceTransaction: Transaction,
) => {
  targetTransaction.id = sourceTransaction.id;
  targetTransaction.amountSent = sourceTransaction.amountSent;
  targetTransaction.amountReceived = sourceTransaction.amountReceived;
  targetTransaction.date = sourceTransaction.date;
  targetTransaction.description = sourceTransaction.description;
  overrideWallet(targetTransaction.source, sourceTransaction.source);
  overrideWallet(targetTransaction.target, sourceTransaction.target);
};

export const copyTravel = (travel: any) => {
  if (!travel) {
    return new Travel();
  }
  return new Travel({
    id: travel.id,
    startDate: travel.startDate,
    endDate: travel.endDate,
    city: travel.city,
    country: travel.country,
    place: travel.place,
  });
};

export const overrideTravel = (targetTravel: Travel, sourceTravel: Travel) => {
  (targetTravel.id = sourceTravel.id),
    (targetTravel.startDate = sourceTravel.startDate),
    (targetTravel.endDate = sourceTravel.endDate),
    (targetTravel.city = sourceTravel.city),
    (targetTravel.country = sourceTravel.country),
    (targetTravel.place = sourceTravel.place);
};

const getValues = (
  valueA: any,
  valueB: any,
  columns: Array<string>,
  index = 0,
): any => {
  if (valueA instanceof Date) {
    valueA = dateToString(valueA);
  }
  if (valueB instanceof Date) {
    valueB = dateToString(valueB);
  }

  if (valueA instanceof Object) {
    return getValues(
      valueA[columns[index]],
      valueB[columns[index]],
      columns,
      index + 1,
    );
  }

  return { valueA, valueB };
};

export const sortList = (
  source: Array<any>,
  column: string,
  ascOrder = true,
) => {
  const columns = column.split('.');
  return source.sort((itemA, itemB) => {
    const { valueA, valueB } = getValues(itemA, itemB, columns);

    if (valueA < valueB) {
      return ascOrder ? -1 : 1;
    }
    if (valueA > valueB) {
      return ascOrder ? 1 : -1;
    }
    return 0;
  });
};
