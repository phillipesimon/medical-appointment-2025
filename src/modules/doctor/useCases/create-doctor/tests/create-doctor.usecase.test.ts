import { describe, expect, test, beforeAll } from "vitest";
import { randomUUID } from "crypto";
import {
  CreateDoctorRequest,
  CreateDoctorUseCase,
} from "../create-doctor.usecase";

import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository";
import { SpecialityMemoryRepository } from "../../../../speciality/repositories/implementations/speciality.memory.repository";
import { Speciality } from "../../../../speciality/entities/speciality.entity";
import { ISpecialityRepository } from "../../../../speciality/repositories/speciality.repository";
import { DoctorMemoryRepository } from "../../../repositories/implementations/in-memory/doctor-memory.repository";

let specialityRepository: ISpecialityRepository;
let speciality: Speciality;

beforeAll(() => {
  specialityRepository = new SpecialityMemoryRepository();

  speciality = Speciality.create({
    description: "DESC_TEST",
    name: "NAME_TEST",
  });
});

describe("Create Doctor Use Case", () => {
  test("Should be able to create a new Doctor", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    await specialityRepository.save(speciality);

    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      password: "password_test",
      email: "email@gmail.com",
      crm: "123456",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );
    const doctorCreated = await createDoctorUseCase.execute(doctorMock);

    expect(doctorCreated).toHaveProperty("id");
  });

  test("Should not be able to create a new Doctor with exists CRM", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    await specialityRepository.save(speciality);

    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      password: "password_test",
      email: "email@gmail.com",
      crm: "123456",
      specialityId: speciality.id,
    };

    const doctorMockDuplicated: CreateDoctorRequest = {
      username: "username_duplicated",
      name: "name_duplicated",
      password: "password_duplicated",
      email: "emailduplicated@gmail.com",
      crm: "123456",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );
    await createDoctorUseCase.execute(doctorMock);

    expect(async () => {
      await createDoctorUseCase.execute(doctorMockDuplicated);
    }).rejects.toThrow("CRM already exists");
  });

  test("Should not be able to create a new Doctor with CRM length invalid", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    await specialityRepository.save(speciality);

    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      password: "password_test",
      email: "email@gmail.com",
      crm: "12345",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );

    expect(async () => {
      await createDoctorUseCase.execute(doctorMock);
    }).rejects.toThrow("CRM length is incorrect!");
  });
});
