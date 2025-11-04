import { CustomError } from "../../../../error/custom.error";
import { DoctorInfo } from "../../entities/doctor-info.entity";
import { IDoctorInfoRepository } from "../../repositories/doctor-info.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type DoctorInfoRequest = {
  startAt: string;
  endAt: string;
  price: number;
  duration: number;
};

export class CreateDoctorInfoUseCase {
  constructor(
    private doctorRespository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository
  ) {}
  async execute(data: DoctorInfoRequest, userId: string) {
    const doctorByUserID = await this.doctorRespository.findByUserID(userId);

    if (!doctorByUserID) {
      throw new CustomError("Doctor does not exists!");
    }

    const doctorInfo = DoctorInfo.create({
      ...data,
      doctorId: doctorByUserID.id,
    });

    const doctorCreated = await this.doctorInfoRepository.save(doctorInfo);

    return doctorCreated;
  }
}
