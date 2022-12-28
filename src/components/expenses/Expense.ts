import { IExpenseItem } from "../../interfaces";
import { Category } from "../categories/Category";

export class Expense {
  public props: IExpenseItem;

  constructor(objExpense: IExpenseItem = {
    id: '',
    amount: 0,
    card: true,
    category: new Category(),
    date: new Date(),
    deleted: false,
    note: '',
  }){
    this.props = {
      ...objExpense
    }
  }

  public set id(value: string){
    this.props.id = value;
  }

  public get id(): string{
    return this.props.id;
  }

  public set amount(value: number){
    this.props.amount = value;
  }

  public get amount(): number {
    return this.props.amount;
  }

  public set card(value: boolean){
    this.props.card = value;
  }

  public get card(): boolean {
    return this.props.card;
  }

  public set category(value: Category){
    this.props.category = value;
  }

  public get category(): any {
    return this.props.category;
  }
  
  public set date(value: Date){
    this.props.date = value;
  }

  public get date(): Date {
    return this.props.date;
  }

  public set deleted(value: boolean) {
    this.props.deleted = value;
  }

  public get deleted(): boolean {
    return this.props.deleted;
  }

  public set note(value: string){
    this.props.note = value;
  }

  public get note(): string {
    return this.props.note;
  }
}
