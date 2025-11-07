import { Request, Response } from "express";
import { IDoctorInfoRepository } from "../../repositories/doctor-info.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { CreateDoctorInfoUseCase } from "./create-doctor-info.usecase";

export class CreateDoctorInfoController {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository
  ) {}

  async handle(request: Request, response: Response) {
    const { body, userId } = request;
    console.log("userId recebido no controller:", request.userId);
    console.log("body recebido:", request.body);

    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      this.doctorRepository,
      this.doctorInfoRepository
    );

    const result = await createDoctorInfoUseCase.execute(body, userId);

    return response.json(result);
  }
}
