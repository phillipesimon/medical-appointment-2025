import { CustomError } from "../../../../error/custom.error";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Patient } from "../../entities/patient.entity";
import { IPatientRepository } from "../../repositories/patient.repository";

export type CreatePatientRequest = {
  username: string;
  password: string;
  email: string;
  name: string;
  document: string;
};

export class CreatePatientUseCase {
  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRepository
  ) {}

  async execute(data: CreatePatientRequest, avatar?: string) {
    const user = await User.create({
      name: data.name,
      password: data.password,
      username: data.username,
      avatar: avatar,
    });

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const existsPatient = await this.patientRepository.findByDocumentOrEmail(
      data.document,
      data.email
    );

    if (existsPatient) {
      throw new CustomError("Patient already exists!");
    }

    const userCreated = await this.userRepository.save(user);

    const patient = Patient.create({
      document: data.document,
      email: data.email,
      userId: userCreated.id,
    });

    const patientCreated = await this.patientRepository.save(patient);

    return patientCreated;
  }
}
