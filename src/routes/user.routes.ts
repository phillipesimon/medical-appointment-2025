import { Router } from "express";
import { createUserController } from "../models/users/useCases/create-user";

const userRouter = Router();

userRouter.post("/users", createUserController.handle);

export { userRouter };
