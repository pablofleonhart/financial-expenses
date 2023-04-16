import { Wallet } from '../wallets/Wallet';

export class Transaction {
  public id: string;
  public amounSent: number;
  public amounReceived: number;
  public date: Date | string;
  public description: string;
  public source: Wallet;
  public target: Wallet;

  constructor(
    objTransaction: Transaction = {
      id: '',
      amounSent: 0,
      amounReceived: 0,
      date: new Date(),
      description: '',
      source: new Wallet(),
      target: new Wallet(),
    }
  ) {
    this.id = objTransaction.id;
    this.amounSent = objTransaction.amounSent;
    this.amounReceived = objTransaction.amounReceived;
    this.date = objTransaction.date;
    this.description = objTransaction.description;
    this.source = objTransaction.source;
    this.target = objTransaction.target;
  }
}
