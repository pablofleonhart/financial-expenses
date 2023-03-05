import { Category } from '../components/categories/Category';
import { Expense } from '../components/expenses/Expense';
import { Investment } from '../components/investments/Investment';
import { Revenue } from '../components/revenues/Revenue';
import { Wish } from '../components/wishes/Wish';
import { dateToString } from './date-utils';

const copyCategory = (target: Category, source: Category) => {
  target.id = source.id;
  target.name = source.name;
  target.type = source.type;
};

export const copyExpense = (target: Expense, source: Expense) => {
  target.id = source.id;
  target.amount = source.amount;
  target.card = source.card;
  target.date = source.date;
  target.deleted = source.deleted;
  target.note = source.note;
  copyCategory(target.category, source.category);
};

export const copyRevenue = (target: Revenue, source: Revenue) => {
  target.id = source.id;
  target.amount = source.amount;
  target.bank = source.bank;
  target.currency = source.currency;
  target.date = source.date;
  target.deleted = source.deleted;
  target.description = source.description;
  target.type = source.type;
  target.itemStatus = source.itemStatus;
};

export const copyInvestment = (target: Investment, source: Investment) => {
  target.id = source.id;
  target.amount = source.amount;
  target.broker = source.broker;
  target.currency = source.currency;
  target.deleted = source.deleted;
  target.holder = source.holder;
};

export const copyWish = (target: Wish, source: Wish) => {
  target.id = source.id;
  target.amount = source.amount;
  target.currency = source.currency;
  target.deleted = source.deleted;
  target.description = source.description;
  target.itemStatus = source.itemStatus;
};

const getValues = (
  valueA: any,
  valueB: any,
  columns: Array<string>,
  index = 0
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
      index + 1
    );
  }

  return { valueA, valueB };
};

export const sortList = (
  source: Array<any>,
  column: string,
  ascOrder = true
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
