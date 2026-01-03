import { DoctorSchedulePrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { DoctorPrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor.prisma.repository";
import { PatientPrismaRepository } from "../../../patient/repositories/implementations/prisma/patient.prisma";
import { AppointmentPrismaRepository } from "../../repositories/prisma/appointment.prisma.repository";
import { CreateAppointmentController } from "./create-appointment.controller";

const patientRepository = new PatientPrismaRepository();
const doctorReposiroty = new DoctorPrismaRepository();
const doctorScheduleRepository = new DoctorSchedulePrismaRepository();
const appointmentPrismaRepository = new AppointmentPrismaRepository();

const createAppointmentController = new CreateAppointmentController(
  patientRepository,
  doctorReposiroty,
  doctorScheduleRepository,
  appointmentPrismaRepository
);

export { createAppointmentController };
