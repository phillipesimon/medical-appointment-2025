import { z } from "zod";
import e, { Request, Response } from "express";
import { ISpecialityRepository } from "../../../speciality/repositories/speciality.repository";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { CreateDoctorUseCase } from "./create-doctor.usecase";
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { ValidationSchemaError } from "../../../../error/validation-schema.error";

export class CreateDoctorController {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ) {}

  async handle(request: Request, response: Response) {
    const { body } = request;

    const doctorSchema = z.object({
      username: z.string(),
      name: z.string(),
      email: z.email({
        message: "You need to insert a valid email",
      }),
      password: z.string(),
      crm: z.string().length(6, {
        message: "CRM must contain 6 characters",
      }),
      specialityId: z.uuid({
        message: "You need to insert a valid speciality ID",
      }),
    });
    try {
      validatorSchema(doctorSchema, body);
      const createDoctorUseCase = new CreateDoctorUseCase(
        this.userRepository,
        this.doctorRepository,
        this.specialityRepository
      );

      const doctorCreated = await createDoctorUseCase.execute(body);
      return response.json(doctorCreated);
    } catch (erro: any) {
      if (erro instanceof ValidationSchemaError) {
        return response.status(erro.statusCode).json(erro.errors);
      }
      return response.status(erro.statusCode).json(erro.message);
    }
  }
}
