import dayjs from "dayjs";
import { describe, expect, test } from "vitest";
import {
  CreateDoctorInfoUseCase,
  DoctorInfoRequest,
} from "../create-doctor-info.usecase";

import { generateUUID } from "../../../../../utils/generateUUID";
import { DoctorMemoryRepository } from "../../../repositories/implementations/in-memory/doctor-memory.repository";
import { DoctorInfoMemoryRepository } from "../../../repositories/implementations/in-memory/doctor-info-memory.repository";

describe("Create Doctor Info", () => {
  test("Should not be able to create a doctor info if doctor does not exists!", () => {
    const doctorRespository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRespository,
      doctorInfoRepository
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

  test("Should not be able to create a doctor info if endAt is before startAt", async () => {
    const doctorRespository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRespository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRespository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"), // 10:00
      endAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"), // 18:00
      price: 150,
      duration: 10,
    };
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId);
    }).rejects.toThrow("End time cannot be earlier than start time!");
  });

  test("Should not be able to create a doctor info if startAt is invalid", async () => {
    const doctorRespository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRespository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRespository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      startAt: "HH:mm", // 10:00
      endAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"), // 18:00
      price: 150,
      duration: 10,
    };
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId);
    }).rejects.toThrow("Invalid StartAt");
  });

  test("Should not be able to create a doctor info if endAt is invalid", async () => {
    const doctorRespository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRespository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRespository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"), // 10:00
      endAt: "HH:mm", // 18:00
      price: 150,
      duration: 10,
    };
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId);
    }).rejects.toThrow("Invalid EndAt");
  });

  test("Should be able to create a new doctor info", async () => {
    const doctorRespository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRespository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRespository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      endAt: "18:00",
      startAt: "10:00",
      price: 150,
      duration: 10,
    };
    const doctorCreated = await createDoctorInfoUseCase.execute(
      doctorInfo,
      userId
    );
    expect(doctorCreated).toHaveProperty("id");
  });

  test("Should be able to update a doctor info", async () => {
    const doctorRespository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRespository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRespository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      endAt: "18:00",
      startAt: "10:00",
      price: 150,
      duration: 10,
    };

    const doctorUpdated = await createDoctorInfoUseCase.execute(
      doctorInfo,
      userId
    );
    const doctorCreated = await createDoctorInfoUseCase.execute(
      doctorInfo,
      userId
    );
    expect(doctorCreated).toHaveProperty("id");
    expect(doctorCreated.id).toBe(doctorUpdated.id);
  });
});
