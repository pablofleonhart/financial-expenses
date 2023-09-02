export class Currency {
  public id: string;
  public name: string;
  public type: string;
  public icon: string;

  constructor(
    objCurrency: Currency = {
      id: '',
      name: '',
      type: '',
      icon: '',
    }
  ) {
    this.id = objCurrency.id;
    this.name = objCurrency.name;
    this.type = objCurrency.type;
    this.icon = objCurrency.icon;
  }
}
