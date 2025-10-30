import { randomUUID } from "crypto";
import { ParameterRequiredError } from "../../../error/parameter-required.error";

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
    if (!username || !password) {
      throw new ParameterRequiredError("Username/password is required.", 422);
    }

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
