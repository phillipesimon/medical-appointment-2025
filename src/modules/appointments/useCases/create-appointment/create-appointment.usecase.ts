import { CustomError } from "../../../../error/custom.error";

export type CreateAppointmentRequest = {
  patientId: string;
  doctorId: string;
  date: Date;
};

export class CreateAppointmentUseCase {
  async execute(data: CreateAppointmentRequest) {
    throw new CustomError("Patient does not exists");
  }
}
