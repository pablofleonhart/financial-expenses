export class Investment {
  public id: string;
  public amount: number;
  public broker: string;
  public currency: string;
  public deleted: boolean;
  public holder: string;
  public available: boolean;

  constructor(
    objInvestment: Investment = {
      id: '',
      amount: 0,
      currency: 'real',
      broker: '',
      deleted: false,
      holder: '',
      available: false,
    }
  ) {
    this.id = objInvestment.id;
    this.amount = objInvestment.amount;
    this.currency = objInvestment.currency;
    this.broker = objInvestment.broker;
    this.deleted = objInvestment.deleted;
    this.holder = objInvestment.holder;
    this.available = objInvestment.available;
  }
}
