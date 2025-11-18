import { Request, Response } from "express";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { FreeSchedulesUseCase } from "./free-schedules.usecase";

export class FreeScheduleController {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async handle(request: Request, response: Response) {
    const freeSchedulesUseCase = new FreeSchedulesUseCase(
      this.doctorScheduleRepository,
      this.appointmentRepository
    );

    try {
      const result = await freeSchedulesUseCase.execute(request.body);
      return response.json(result);
    } catch (err: any) {
      return response.status(err.statusCode ?? 500).json(err.message);
    }
  }
}
