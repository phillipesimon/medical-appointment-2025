export type CreateDoctorScheduleRequest = {
  startAt: string;
  endAt: string;
  dayOfWeek: number;
};

export class CreateDoctorScheduleUseCase {
  async execute() {}
}
