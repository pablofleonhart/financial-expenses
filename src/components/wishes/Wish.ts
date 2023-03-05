import { WISH_STATUS } from '../../types';

export class Wish {
  public id: string;
  public amount: number;
  public deleted: boolean;
  public description: string;
  public currency: string;
  public itemStatus: number;

  constructor(
    objRevenue: Wish = {
      id: '',
      amount: 0,
      deleted: false,
      description: '',
      currency: 'euro',
      itemStatus: WISH_STATUS.OPEN,
    }
  ) {
    this.id = objRevenue.id;
    this.amount = objRevenue.amount;
    this.deleted = objRevenue.deleted;
    this.description = objRevenue.description;
    this.currency = objRevenue.currency;
    this.itemStatus = objRevenue.itemStatus;
  }
}
