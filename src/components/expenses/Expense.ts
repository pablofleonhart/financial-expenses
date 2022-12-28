import { Category } from "../categories/Category";

export class Expense {
  public id: string;
  public amount: number;
  public card: boolean;
  public category: Category;
  public date: Date;
  public deleted: boolean;
  public note: string;

  constructor(objExpense: Expense = {
    id: '',
    amount: 0,
    card: true,
    category: new Category(),
    date: new Date(),
    deleted: false,
    note: '',
  }){
    this.id = objExpense.id;
    this.amount = objExpense.amount;
    this.card = objExpense.card;
    this.category = objExpense.category;
    this.date = objExpense.date;
    this.deleted = objExpense.deleted;
    this.note = objExpense.note;
  }
}
