import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { PatientPrismaRepository } from "../../repositories/implementations/prisma/patient.prisma.repository";
import { CreatePatientController } from "./create-patient.controller";

const userRepository = new UserPrismaRepository();
const patientRepostiory = new PatientPrismaRepository();

const createPatientController = new CreatePatientController(
  userRepository,
  patientRepostiory
);

export { createPatientController };
