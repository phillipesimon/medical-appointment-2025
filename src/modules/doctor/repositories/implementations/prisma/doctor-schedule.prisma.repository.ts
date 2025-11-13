import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { DoctorSchedule } from "../../../entities/doctor-schedule.entity";
import { DoctorScheduleMapper } from "../../../mapper/doctor-schedule.map";
import { IDoctorScheduleRepository } from "../../doctor-schedule.repository";

export class DoctorSchedulePrismaRepository
  implements IDoctorScheduleRepository
{
  async save(data: DoctorSchedule): Promise<void> {
    await prismaClient.$transaction([
      prismaClient.doctorSchedules.deleteMany({
        where: {
          doctor_id: data.doctorId,
        },
      }),

      prismaClient.doctorSchedules.createMany({
        data: DoctorScheduleMapper.entityToPrisma(data),
      }),
    ]);
  }
}
