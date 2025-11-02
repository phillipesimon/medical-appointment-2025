import { CustomError } from "../../../../error/custom.error";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type DoctorInfoRequest = {
  startAt: string;
  endAt: string;
  price: number;
  duration: number;
};

export class CreateDoctorInfoUseCase {
  constructor(private doctorRespository: IDoctorRepository) {}
  async execute(data: DoctorInfoRequest, userId: string) {
    const doctorByUserID = await this.doctorRespository.findByUserID(userId);

    if (!doctorByUserID) {
      throw new CustomError("Doctor does not exists!");
    }
  }
}
