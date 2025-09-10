import { Request, Response } from "express";
import { CreateUserCase } from "./create-user.usecase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const data = request.body;
      const useCase = new CreateUserCase();

      const result = await useCase.execute(data);

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
