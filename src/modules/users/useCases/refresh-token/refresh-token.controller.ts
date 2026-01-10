import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./refresh-token.usecase";
import { TokenError } from "../../../../error/token.error";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";

export class RefreshTokenController {
  constructor(private token: IToken, private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const { refreshToken } = request.body;
      console.log(refreshToken);
      const useCase = new RefreshTokenUseCase(this.token, this.userRepository);
      const result = await useCase.execute(refreshToken);
      return response.json(result);
    } catch (err) {
      if (err instanceof TokenError) {
        return response.status(err.statusCode || 401).json(err.message);
      }
    }
  }
}
