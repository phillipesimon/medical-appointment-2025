import { describe, expect, test } from "vitest";
import { randomUUID } from "crypto";
import {
  CreateDoctorRequest,
  CreateDoctorUseCase,
} from "../create-doctor.usecase";
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor-memory.repository";
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository";

describe("Create Doctor Use Case", () => {
  test("Should be able to create a new Doctor", async () => {
    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      password: "password_test",
      email: "email@gmail.com",
      crm: "123456",
      specialityId: randomUUID(),
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository
    );
    const doctorCreated = await createDoctorUseCase.execute(doctorMock);

    expect(doctorCreated).toHaveProperty("id");
  });

  test("Should not be able to create a new Doctor with exists CRM", async () => {
    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      password: "password_test",
      email: "email@gmail.com",
      crm: "123456",
      specialityId: randomUUID(),
    };

    const doctorMockDuplicated: CreateDoctorRequest = {
      username: "username_duplicated",
      name: "name_duplicated",
      password: "password_duplicated",
      email: "emailduplicated@gmail.com",
      crm: "123456",
      specialityId: randomUUID(),
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository
    );
    await createDoctorUseCase.execute(doctorMock);

    expect(async () => {
      await createDoctorUseCase.execute(doctorMockDuplicated);
    }).rejects.toThrow("CRM already exists");
  });

  test("Should not be able to create a new Doctor with CRM length invalid", async () => {
    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      password: "password_test",
      email: "email@gmail.com",
      crm: "12345",
      specialityId: randomUUID(),
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository
    );

    expect(async () => {
      await createDoctorUseCase.execute(doctorMock);
    }).rejects.toThrow("CRM length is incorrect!");
  });
});
