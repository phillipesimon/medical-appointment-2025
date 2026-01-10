import { CustomError } from "../../../../error/custom.error";
import { CreateConnectionRedis } from "../../../../infra/providers/redis";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";
import { sign } from "jsonwebtoken";

type AuthenticateRequest = {
  username: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async execute({ username, password }: AuthenticateRequest) {
    if (!username || !password) {
      throw new CustomError("Username/password incorrect", 401);
    }

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new CustomError("Username/password incorrect", 401);
    }

    const comparePasswordEquals = await this.passwordCrypto.compare(
      password,
      user.password
    );

    if (!comparePasswordEquals) {
      throw new CustomError("Username/password incorrect", 401);
    }

    const tokenGenerated = this.token.create(user);

    const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || "";

    const refreshToken = sign({}, refreshTokenSecret, {
      subject: user.id,
      expiresIn: 30,
    });

    const redisClient = new CreateConnectionRedis();
    await redisClient.setValue(user.id, refreshToken);

    return {
      token: tokenGenerated,
      refreshToken,
    };
  }
}
