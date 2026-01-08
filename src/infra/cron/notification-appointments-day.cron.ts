import cron from "node-cron";
import { AppointmentPrismaRepository } from "../../modules/appointments/repositories/prisma/appointment.prisma.repository";
import { CreateNotificationAppointmentUseCase } from "../../modules/appointments/useCases/create-notification-appointment/create-notification-appointment.usecase";
import { EtherealMailProvider } from "../providers/mail/implementations/ethereal.mail.provider";

cron.schedule("*/5 * * * * *", async () => {
  const appoitmentRespository = new AppointmentPrismaRepository();
  const mailProvider = new EtherealMailProvider();
  const createNotificationAppointmentUseCase =
    new CreateNotificationAppointmentUseCase(
      appoitmentRespository,
      mailProvider
    );
  await createNotificationAppointmentUseCase.execute();
});
