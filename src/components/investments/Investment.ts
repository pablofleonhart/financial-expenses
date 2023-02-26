export class Investment {
  public id: string;
  public amount: number;
  public broker: string;
  public currency: string;
  public deleted: boolean;
  public holder: string;

  constructor(
    objCategory: Investment = {
      id: '',
      amount: 0,
      currency: 'real',
      broker: '',
      deleted: false,
      holder: '',
    }
  ) {
    this.id = objCategory.id;
    this.amount = objCategory.amount;
    this.currency = objCategory.currency;
    this.broker = objCategory.broker;
    this.deleted = objCategory.deleted;
    this.holder = objCategory.holder;
  }
}
