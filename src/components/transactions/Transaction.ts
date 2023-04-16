import { Wallet } from '../wallets/Wallet';

export class Transaction {
  public id: string;
  public amountSent: number;
  public amountReceived: number;
  public date: Date | string;
  public description: string;
  public source: Wallet;
  public target: Wallet;

  constructor(
    objTransaction: Transaction = {
      id: '',
      amountSent: 0,
      amountReceived: 0,
      date: new Date(),
      description: '',
      source: new Wallet(),
      target: new Wallet(),
    }
  ) {
    this.id = objTransaction.id;
    this.amountSent = objTransaction.amountSent;
    this.amountReceived = objTransaction.amountReceived;
    this.date = objTransaction.date;
    this.description = objTransaction.description;
    this.source = objTransaction.source;
    this.target = objTransaction.target;
  }
}
