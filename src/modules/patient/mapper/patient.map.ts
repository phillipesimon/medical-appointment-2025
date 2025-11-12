import { Patient } from "../entities/patient.entity";
import { Patient as PatientPrisma } from "@prisma/client";

export class PatientMapper {
  static entityToPrisma = (patinet: Patient): PatientPrisma => {
    return {
      ...patinet,
      user_id: patinet.userId,
    };
  };

  static prismaToEntity = (patient: PatientPrisma): Patient => {
    return {
      ...patient,
      userId: patient.user_id,
    };
  };
}
