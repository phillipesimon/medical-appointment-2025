import { User } from "../../entities/user.entity";
import { ParameterRequiredError } from "../../../../error/parameter-required.error";
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserRequest) {
    const user = User.create(data);

    if (!data.username || !data.password) {
      throw new ParameterRequiredError("Username/Password is requierd!", 422);
    }

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new Error("Username already exists");
    }

    const userCreated = await this.userRepository.save(user);

    return userCreated;
  }
}
