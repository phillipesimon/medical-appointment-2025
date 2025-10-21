import { Router } from "express";
import { createSpecialityController } from "../models/speciality/useCases/create-speciality";

const specialityRouter = Router();

specialityRouter.post("/specialities", async (req, res) => {
  await createSpecialityController.handle(req, res);
});

export { specialityRouter };
