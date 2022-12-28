import { ICategoryItem } from "../../interfaces";

export class Category {
  public props: ICategoryItem;

  constructor(objExpense: ICategoryItem = {
    id: '',
    name: '',
    type: ''
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

  public set name(value: string){
    this.props.name = value;
  }

  public get name(): string {
    return this.props.name;
  }

  public set type(value: string){
    this.props.type = value;
  }

  public get type(): string {
    return this.props.type;
  }
}
