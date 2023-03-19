import { WALLET_TYPE } from '../../types';

export class Wallet {
  public id: string;
  public amount: number;
  public broker: string;
  public currency: string;
  public deleted: boolean;
  public holder: string;
  public type: number;

  constructor(
    objWallet: Wallet = {
      id: '',
      amount: 0,
      currency: '',
      broker: '',
      deleted: false,
      holder: '',
      type: WALLET_TYPE.BALANCE,
    }
  ) {
    this.id = objWallet.id;
    this.amount = objWallet.amount;
    this.currency = objWallet.currency;
    this.broker = objWallet.broker;
    this.deleted = objWallet.deleted;
    this.holder = objWallet.holder;
    this.type = objWallet.type;
  }
}
