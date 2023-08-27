import { Avatar } from './Avatar';

export class User {
  public id: string;
  public name: string;
  public email: string;
  public avatar?: Avatar | null | undefined;

  constructor(
    objUser: User = {
      id: '',
      name: '',
      email: '',
      avatar: new Avatar(),
    }
  ) {
    this.id = objUser.id;
    this.name = objUser.name;
    this.email = objUser.email;
    this.avatar = objUser.avatar;
  }
}
