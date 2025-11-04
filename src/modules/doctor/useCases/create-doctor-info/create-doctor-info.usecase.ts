import { CustomError } from "../../../../error/custom.error";
import { DoctorInfo } from "../../entities/doctor-info.entity";
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

    const doctorInfo = DoctorInfo.create({
      ...data,
      doctorId: doctorByUserID.id,
    });

    return doctorInfo;
  }
}
