export class Expense {
  public id: string;
  public paymentID: string | null;
  public accountName: string | null;
  public amount: number;
  public authorID: string;
  public categoryID: string;
  public categoryName: string;
  public currencyType: string;
  public date: Date | string;
  public deletedAt: Date | null;
  public description: string;
  public fullfiledAt: Date | null;
  public isVariable: boolean;
  public travelID: string | null;
  public installments: string;

  constructor(
    objExpense: Expense = {
      id: '',
      paymentID: '',
      accountName: '',
      amount: 0,
      authorID: '',
      categoryID: '',
      categoryName: '',
      currencyType: '',
      date: new Date(),
      deletedAt: null,
      description: '',
      fullfiledAt: null,
      isVariable: true,
      travelID: null,
      installments: '1',
    },
  ) {
    this.id = objExpense.id;
    this.paymentID = objExpense.paymentID;
    this.accountName = objExpense.accountName;
    this.amount = objExpense.amount;
    this.authorID = objExpense.authorID;
    this.categoryID = objExpense.categoryID;
    this.categoryName = objExpense.categoryName;
    this.currencyType = objExpense.currencyType;
    this.date = objExpense.date;
    this.deletedAt = objExpense.deletedAt;
    this.description = objExpense.description;
    this.fullfiledAt = objExpense.fullfiledAt;
    this.isVariable = objExpense.isVariable;
    this.travelID = objExpense.travelID;
    this.installments = objExpense.installments;
  }
}
