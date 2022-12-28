import { IRevenueItem } from "../../interfaces";

export class Revenue {
  public props: IRevenueItem;

  constructor(objRevenue: IRevenueItem = {
    id: '',
    amount: 0,
    bank: '',
    date: new Date(),
    deleted: false,
    description: '',
    type: 'income'
  }){
    this.props = {
      ...objRevenue
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

  public set description(value: string){
    this.props.description = value;
  }

  public get description(): string {
    return this.props.description;
  }

  public set date(value: Date){
    this.props.date = value;
  }

  public get date(): Date {
    return this.props.date;
  }

  public set bank(value: string){
    this.props.bank = value;
  }

  public get bank(): string {
    return this.props.bank;
  }

  public set type(value: string){
    this.props.type = value;
  }

  public get type(): string {
    return this.props.type;
  }

  public set deleted(value: boolean) {
    this.props.deleted = value;
  }

  public get deleted(): boolean {
    return this.props.deleted;
  }
}
