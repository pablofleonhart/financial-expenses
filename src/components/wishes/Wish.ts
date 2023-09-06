export class Wish {
  public id: string;
  public amount: number;
  public categoryID: string;
  public currencyID: string;
  public deletedAt: Date | null;
  public description: string;
  public fullfiledAt: Date | null;
  public authorID: string;

  constructor(
    objWish: Wish = {
      id: '',
      amount: 0,
      categoryID: '',
      currencyID: '',
      deletedAt: null,
      description: '',
      fullfiledAt: null,
      authorID: '',
    },
  ) {
    this.id = objWish.id;
    this.amount = objWish.amount;
    this.categoryID = objWish.categoryID;
    this.currencyID = objWish.currencyID;
    this.deletedAt = objWish.deletedAt;
    this.description = objWish.description;
    this.fullfiledAt = objWish.fullfiledAt;
    this.authorID = objWish.authorID;
  }
}
