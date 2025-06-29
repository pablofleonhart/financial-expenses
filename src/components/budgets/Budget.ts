import {
  formatDateToISO,
  getBusinessMonthFinalDate,
  getBusinessMonthInitialDate,
} from '../../utils';

export class Budget {
  public id: string;
  public amount: number;
  public spentAmount: number;
  public percentageCompleted: number;
  public currencyID: string;
  public currencyType: string;
  public categoryID: string;
  public categoryName: string;
  public description: string;
  public startDate: string | Date;
  public endDate: string | Date;
  public authorID: string;
  public travelID: string | null;

  public constructor(
    objBudget: Budget = {
      id: '',
      amount: 0,
      spentAmount: 0,
      percentageCompleted: 0,
      startDate: getBusinessMonthInitialDate(),
      currencyID: '',
      currencyType: '',
      categoryName: '',
      description: '',
      endDate: getBusinessMonthFinalDate(),
      authorID: '',
      categoryID: '',
      travelID: null,
    },
  ) {
    this.id = objBudget.id;
    this.amount = objBudget.amount;
    this.spentAmount = objBudget.spentAmount;
    this.percentageCompleted = objBudget.percentageCompleted;
    this.startDate = objBudget.startDate;
    this.categoryID = objBudget.categoryID;
    this.categoryName = objBudget.categoryName;
    this.currencyID = objBudget.currencyID;
    this.currencyType = objBudget.currencyType;
    this.description = objBudget.description;
    this.endDate = objBudget.endDate;
    this.authorID = objBudget.authorID;
    this.travelID = objBudget.travelID;
  }
}
