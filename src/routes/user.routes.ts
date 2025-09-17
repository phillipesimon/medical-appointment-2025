import { Router } from "express";
import { createUserController } from "../models/users/useCases/create-user";

const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

export { userRouter };
