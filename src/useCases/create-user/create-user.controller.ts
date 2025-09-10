import { Request, Response } from "express";
import { CreateUserCase } from "./create-user.usecase";
import { logger } from "../../utils/logger";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    logger.info("Usuário sendo criado!");
    try {
      const data = request.body;
      const useCase = new CreateUserCase();

      const result = await useCase.execute(data);

      return response.json(result);
    } catch (err: any) {
      logger.error(err.stack);
      return response.status(err.statusCode).json(err.message);
    }
  }
}
