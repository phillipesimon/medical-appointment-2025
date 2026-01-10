import { sign, verify } from "jsonwebtoken";
import { CreateConnectionRedis } from "../../../../infra/providers/redis";
import { TokenError } from "../../../../error/token.error";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";

class RefreshTokenUseCase {
  constructor(private token: IToken, private userRepository: IUserRepository) {}

  async execute(refreshToken: string) {
    const secretKeyRefreshToken = process.env.SECRET_KEY_REFRESH_TOKEN || "";
    console.log("SECRETKEY", secretKeyRefreshToken);

    try {
      const { sub } = verify(refreshToken, secretKeyRefreshToken);

      const redisClient = new CreateConnectionRedis();
      const refreshTokenRedis = await redisClient.getValue(String(sub));
      console.log("ID-CLIENT ", refreshTokenRedis);

      if (refreshToken !== refreshTokenRedis) {
        throw new TokenError("Refresh Token Incorrect", 401);
      }

      const user = await this.userRepository.findById(String(sub));

      if (!user) {
        throw new Error("User does not exists!");
      }

      const tokenGenerated = this.token.create(user);

      // Gerar um refresh_token

      const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || "";

      const newRefreshToken = sign({}, refreshTokenSecret, {
        subject: user.id,
        expiresIn: 30,
      });
      // Salvar no redis

      await redisClient.setValue(user.id, newRefreshToken);

      return {
        token: tokenGenerated,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new TokenError("Token incorrect", 401);
    }
  }
}

export { RefreshTokenUseCase };
