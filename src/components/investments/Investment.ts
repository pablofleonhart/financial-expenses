export class Investment {
  public id: string;
  public amount: number;
  public currency: string;
  public description: string;
  public deleted: boolean;

  constructor(
    objCategory: Investment = {
      id: '',
      amount: 0,
      currency: 'real',
      description: '',
      deleted: false
    }
  ) {
    this.id = objCategory.id;
    this.amount = objCategory.amount;
    this.currency = objCategory.currency;
    this.description = objCategory.description;
    this.deleted = objCategory.deleted;
  }
}
