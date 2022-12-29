export class Category {
  public id: string;
  public name: string;
  public type: string;

  constructor(
    objCategory: Category = {
      id: '',
      name: '',
      type: '',
    }
  ) {
    this.id = objCategory.id;
    this.name = objCategory.name;
    this.type = objCategory.type;
  }
}
