import { DoctorSchedulePrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { AppointmentPrismaRepository } from "../../repositories/prisma/appointment.prisma.repository";
import { FreeScheduleController } from "./free-schedules.controller";

const doctorSchedulePrismaRepository = new DoctorSchedulePrismaRepository();
const appointmentPrismaRepository = new AppointmentPrismaRepository();
const freeScheduleController = new FreeScheduleController(
  doctorSchedulePrismaRepository,
  appointmentPrismaRepository
);

export { freeScheduleController };
