export class Account {
  public id: string;
  public name: string;
  public email: string;

  constructor(
    objAccount: Account = {
      id: '',
      name: '',
      email: '',
    }
  ) {
    this.id = objAccount.id;
    this.name = objAccount.name;
    this.email = objAccount.email;
  }
}
