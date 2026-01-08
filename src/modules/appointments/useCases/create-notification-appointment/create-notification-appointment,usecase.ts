import { IAppointmentRepository } from "../../repositories/appointment.repository";

export class CreateNotificationAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute() {
    const result =
      await this.appointmentRepository.findAllTodayIncludePatients();
    return result;
  }
}
