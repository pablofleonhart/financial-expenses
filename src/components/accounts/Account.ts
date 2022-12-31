import { Avatar } from './Avatar';

export class Account {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public avatar?: Avatar | null | undefined;

  constructor(
    objAccount: Account = {
      id: '',
      name: '',
      email: '',
      password: '',
      avatar: new Avatar(),
    }
  ) {
    this.id = objAccount.id;
    this.name = objAccount.name;
    this.email = objAccount.email;
    this.password = objAccount.password;
    this.avatar = objAccount.avatar;
  }
}
