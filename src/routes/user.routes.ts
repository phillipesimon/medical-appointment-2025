import { Router } from "express";
import { createUserController } from "../modules/users/useCases/create-user";
import { authenticateUserController } from "../modules/users/useCases/authenticate-user";
import { refreshTokenController } from "../modules/users/useCases/refresh-token";

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  await authenticateUserController.handle(req, res);
});

userRouter.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

userRouter.post("/refresh-token", async (request, response) => {
  await refreshTokenController.handle(request, response);
});

export { userRouter };
