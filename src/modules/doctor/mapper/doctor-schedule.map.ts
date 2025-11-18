import { da } from "zod/v4/locales";
import { DoctorSchedule } from "../entities/doctor-schedule.entity";
import { DoctorSchedules as DoctorSchedulePrisma } from "@prisma/client";
import { generateUUID } from "../../../utils/generateUUID";

export type DoctorScheduleWeek = {
  startAt: string;
  endAt: string;
  dayOfWeek: number;
  doctorId: string;
};

export class DoctorScheduleMapper {
  static entityToPrisma = (data: DoctorSchedule): DoctorSchedulePrisma[] => {
    const doctorSchedulePrisma: DoctorSchedulePrisma[] = [];
    data.schedules.forEach((schedule) => {
      doctorSchedulePrisma.push({
        day_of_week: schedule.dayOfWeek,
        doctor_id: data.doctorId,
        end_at: schedule.endAt,
        start_at: schedule.startAt,
        id: schedule.id ?? generateUUID(),
      });
    });
    return doctorSchedulePrisma;
  };

  static prismaToEntity = (
    schedule: DoctorSchedulePrisma
  ): DoctorScheduleWeek => {
    return {
      doctorId: schedule.doctor_id,
      startAt: schedule.start_at,
      endAt: schedule.end_at,
      dayOfWeek: schedule.day_of_week,
    };
  };
}
