import { randomUUID } from "crypto";
import { ParameterRequiredError } from "../../../error/parameter-required.error";
import { CustomError } from "../../../error/custom.error";
import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt";

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

  static async create(props: IUser) {
    if (!props.password) {
      throw new CustomError("Username/password is required.");
    }
    const bcrypt = new PasswordBcrypt();
    const passwordHashed = await bcrypt.hash(props.password);
    props.password = passwordHashed;

    const user = new User(props);
    return user;
  }
}
