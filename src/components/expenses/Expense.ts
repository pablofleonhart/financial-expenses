import { Author } from '../accounts/Author';
import { Category } from '../categories/Category';
import { Wallet } from '../wallets/Wallet';

export class Expense {
  public id: string;
  public amount: number;
  public card: boolean;
  public category: Category;
  public date: Date | string;
  public deleted: boolean;
  public note: string;
  public author: Author;
  public currency: string;
  public payment: Wallet;
  public variable: boolean;

  constructor(
    objExpense: Expense = {
      id: '',
      amount: 0,
      card: true,
      category: new Category(),
      date: new Date(),
      deleted: false,
      note: '',
      author: new Author(),
      currency: 'euro',
      payment: new Wallet(),
      variable: true,
    }
  ) {
    this.id = objExpense.id;
    this.amount = objExpense.amount;
    this.card = objExpense.card;
    this.category = objExpense.category;
    this.date = objExpense.date;
    this.deleted = objExpense.deleted;
    this.note = objExpense.note;
    this.author = objExpense.author;
    this.currency = objExpense.currency;
    this.payment = objExpense.payment;
    this.variable = objExpense.variable;
  }
}
