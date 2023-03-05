import { WISH_STATUS } from '../../types';

export class Wish {
  public id: string;
  public amount: number;
  public deleted: boolean;
  public description: string;
  public currency: string;
  public itemStatus: number;

  constructor(
    objWish: Wish = {
      id: '',
      amount: 0,
      deleted: false,
      description: '',
      currency: 'euro',
      itemStatus: WISH_STATUS.OPEN,
    }
  ) {
    this.id = objWish.id;
    this.amount = objWish.amount;
    this.deleted = objWish.deleted;
    this.description = objWish.description;
    this.currency = objWish.currency;
    this.itemStatus = objWish.itemStatus;
  }
}
