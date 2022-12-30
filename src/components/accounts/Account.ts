export class Account {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(
    objAccount: Account = {
      id: '',
      name: '',
      email: '',
      password: '',
    }
  ) {
    this.id = objAccount.id;
    this.name = objAccount.name;
    this.email = objAccount.email;
    this.password = objAccount.password;
  }
}
