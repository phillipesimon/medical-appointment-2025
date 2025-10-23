import { Router } from "express";
import { createUserController } from "../models/users/useCases/create-user";
import { authenticateUserController } from "../models/users/useCases/authenticate-user";

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  await authenticateUserController.handle(req, res);
});

userRouter.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

export { userRouter };
