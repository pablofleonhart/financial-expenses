import { REVENUE_STATUS } from '../../types';
import { Wallet } from '../wallets/Wallet';

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
  public payment: Wallet | undefined | null;
  public fullfilled: boolean;

  constructor(
    objRevenue: Revenue = {
      id: '',
      amount: 0,
      bank: '',
      date: new Date(),
      deleted: false,
      description: '',
      type: 'income',
      currency: 'euro',
      itemStatus: REVENUE_STATUS.OPEN,
      payment: null,
      fullfilled: true,
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
    this.fullfilled = objRevenue.fullfilled;
  }
}
