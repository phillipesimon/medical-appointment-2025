import { randomUUID } from "crypto";

type IUser = {
  name: string;
  password: string;
  username: string;
};

export class User {
  name: string;
  password: string;
  username: string;
  id: string;
  isAdmin: boolean;

  constructor({ name, password, username }: IUser) {
    this.name = name;
    this.password = password;
    this.username = username;
    this.id = randomUUID();
    this.isAdmin = false;
  }

  static create(props: IUser) {
    const user = new User(props);
    return user;
  }
}
