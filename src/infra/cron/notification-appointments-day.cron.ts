import cron from "node-cron";
import { AppointmentPrismaRepository } from "../../modules/appointments/repositories/prisma/appointment.prisma.repository";
import { CreateNotificationAppointmentUseCase } from "../../modules/appointments/useCases/create-notification-appointment/create-notification-appointment.usecase";

cron.schedule("0 0 0 * * *", async () => {
  const appoitmentRespository = new AppointmentPrismaRepository();
  const createNotificationAppointmentUseCase =
    new CreateNotificationAppointmentUseCase(appoitmentRespository);
  await createNotificationAppointmentUseCase.execute();
});
