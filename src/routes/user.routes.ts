import { Router } from "express";
import { createUserController } from "../modules/users/useCases/create-user";
import { authenticateUserController } from "../modules/users/useCases/authenticate-user";

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  await authenticateUserController.handle(req, res);
});

userRouter.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

export { userRouter };
