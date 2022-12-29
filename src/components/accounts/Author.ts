export class Author {
  public name: string;

  constructor(
    objAuthor: Author = {
      name: 'User',
    }
  ) {
    this.name = objAuthor.name;
  }
}
