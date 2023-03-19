import { REVENUE_STATUS } from '../../types';
import { Investment } from '../investments/Investment';

export class Revenue {
  public id: string;
  public amount: number;
  public bank: string;
  public date: Date;
  public deleted: boolean;
  public description: string;
  public type: string;
  public currency: string;
  public itemStatus: number;
  public payment: Investment;

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
      itemStatus: REVENUE_STATUS.OPEN,
      payment: new Investment(),
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
    this.itemStatus = objRevenue.itemStatus;
    this.payment = objRevenue.payment;
  }
}
