export class Category {
  public id: string;
  public name: string;
  public type: string;
  public icon: string;
  public color: string;

  constructor(
    objCategory: Category = {
      id: '',
      name: '',
      type: '',
      icon: 'ph-warning-octagon',
      color: '#de77ae',
    },
  ) {
    this.id = objCategory.id;
    this.name = objCategory.name;
    this.type = objCategory.type;
    this.icon = objCategory.icon;
    this.color = objCategory.color;
  }
}
