export class Account {
  public id: string;
  public amount: number;
  public bankName: string;
  public currencyID: string;
  public description: string;
  public type: string;
  public userID?: string;

  public constructor(
    objAccount: Account = {
      id: '',
      amount: 0,
      bankName: '',
      currencyID: '',
      description: '',
      type: '',
      userID: '',
    },
  ) {
    this.id = objAccount.id;
    this.amount = objAccount.amount;
    this.bankName = objAccount.bankName;
    this.currencyID = objAccount.currencyID;
    this.description = objAccount.description;
    this.type = objAccount.type;
    this.userID = objAccount.userID;
  }
}
