import { User } from "../../entities/user.entity";
import { ParameterRequiredError } from "../../error/parameter-required.error";
import { UserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserCase {
  async execute(data: UserRequest) {
    const userRespository = UserRepository.getInstance();
    const user = User.create(data);

    if (!data.username || !data.password) {
      throw new ParameterRequiredError("Username/Password is requierd!", 422);
    }

    const existUser = await userRespository.findByUsername(data.username);

    if (existUser) {
      throw new Error("Username already exists");
    }

    const userCreated = await userRespository.save(user);

    return userCreated;
  }
}
