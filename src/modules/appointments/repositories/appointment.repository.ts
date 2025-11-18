export type AppointmentsDate = {
  date: Date;
};

export interface IAppointmentRepository {
  findAllSchedulesByDoctorDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]>;
}
