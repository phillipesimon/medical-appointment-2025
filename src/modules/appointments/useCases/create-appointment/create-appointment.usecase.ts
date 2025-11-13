import { CustomError } from "../../../../error/custom.error";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";
import { IPatientRepository } from "../../../patient/repositories/patient.repository";

export type CreateAppointmentRequest = {
  doctorId: string;
  date: Date;
};

export class CreateAppointmentUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRespository: IDoctorRepository
  ) {}

  async execute(data: CreateAppointmentRequest, userId: string) {
    const patientExists = await this.patientRepository.findByUserId(userId);

    if (!patientExists) {
      throw new CustomError("Patient does not exists");
    }
    const doctorExists = await this.doctorRespository.findById(data.doctorId);

    if (!doctorExists) {
      throw new CustomError("Doctor does not exists");
    }
  }
}
