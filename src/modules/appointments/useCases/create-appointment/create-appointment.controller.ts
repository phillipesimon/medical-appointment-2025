import { Request, Response } from "express";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IPatientRepository } from "../../../patient/repositories/patient.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { CreateAppointmentUseCase } from "./create-appointment.usecase";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";
import { IMailProvider } from "../../../../infra/providers/mail/mail.proviider";

export class CreateAppointmentController {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ) {}

  async handle(request: Request, response: Response) {
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      this.patientRepository,
      this.doctorRepository,
      this.doctorScheduleRepository,
      this.appointmentRepository,
      this.mailProvider
    );

    try {
      await createAppointmentUseCase.execute(request.body, request.userId);
      return response.status(201).json({ message: "Appointment created" });
    } catch (err: any) {
      console.log(err);
      return response.status(err.statusCode ?? 500).json(err.message);
    }
  }
}
