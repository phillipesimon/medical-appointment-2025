import { prismaClient } from "../../../../infra/databases/prisma.config";
import {
  AppointmentsDate,
  IAppointmentRepository,
} from "../appointment.repository";

export class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]> {
    return await prismaClient.$queryRaw`
        SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD') = ${date}
        and doctor_id = ${doctorId}
    `;
  }
}
