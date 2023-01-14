import { Category } from '../components/categories/Category';
import { Expense } from '../components/expenses/Expense';
import { Revenue } from '../components/revenues/Revenue';
import { dateToString } from './date-utils';

const copyCategory = (target: Category, source: Category) => {
  target.name = source.name;
  target.type = source.type;
};

export const copyExpense = (target: Expense, source: Expense) => {
  target.amount = source.amount;
  target.card = source.card;
  target.date = source.date;
  target.deleted = source.deleted;
  target.note = source.note;
  copyCategory(target.category, source.category);
};

export const copyRevenue = (target: Revenue, source: Revenue) => {
  target.amount = source.amount;
  target.bank = source.bank;
  target.date = source.date;
  target.deleted = source.deleted;
  target.description = source.description;
  target.type = source.type;
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
