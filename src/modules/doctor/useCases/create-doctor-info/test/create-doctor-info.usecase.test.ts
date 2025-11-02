import dayjs from "dayjs";
import { describe, expect, test } from "vitest";
import {
  CreateDoctorInfoUseCase,
  DoctorInfoRequest,
} from "../create-doctor-info.usecase";
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor-memory.repository";

describe("Create Doctor Info", () => {
  test("Should not be able to create a doctor info if doctor does not exists!", () => {
    const doctorRespository = new DoctorMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRespository
    );

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, "INVALID_USER");
    }).rejects.toThrow("Doctor does not exists!");
  });
});
