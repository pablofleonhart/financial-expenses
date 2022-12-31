import { Category } from '../components/categories/Category';
import { Expense } from '../components/expenses/Expense';
import { Revenue } from '../components/revenues/Revenue';

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
