import { Router } from "express";
import { freeScheduleController } from "../modules/appointments/useCases/free-schedules/inted";

const appointmentRoutes = Router();

appointmentRoutes.get("/appointments/free", async (request, response) => {
  await freeScheduleController.handle(request, response);
});

export { appointmentRoutes };
