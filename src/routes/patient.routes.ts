import { Request, Response, Router } from "express";
import { createPatientController } from "../modules/patient/useCases/create-patient";

import multer from "multer";

const uploadTest = multer({
  dest: "./upload",
});

const patientRouter = Router();

patientRouter.post(
  "/upload-test",
  uploadTest.single("fileTest"),
  (request: Request, response: Response) => {
    console.log(request.file);
    return response.json({ message: "Ok" });
  }
);

patientRouter.post("/patients", async (request, response) => {
  await createPatientController.handle(request, response);
});

export { patientRouter };
