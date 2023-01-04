export class Revenue {
  public id: string;
  public amount: number;
  public bank: string;
  public date: Date;
  public deleted: boolean;
  public description: string;
  public type: string;
  public currency: string;

  constructor(
    objRevenue: Revenue = {
      id: '',
      amount: 0,
      bank: '',
      date: new Date(),
      deleted: false,
      description: '',
      type: 'income',
      currency: 'real',
    }
  ) {
    this.id = objRevenue.id;
    this.amount = objRevenue.amount;
    this.bank = objRevenue.bank;
    this.date = objRevenue.date;
    this.deleted = objRevenue.deleted;
    this.description = objRevenue.description;
    this.type = objRevenue.type;
    this.currency = objRevenue.currency;
  }
}
