import { describe, expect, test } from "vitest";
import { generateUUID } from "../../../../../utils/generateUUID";
import { CreateAppointmentUseCase } from "../create-appointment.usecase";

describe("Cadastro de agendamento", () => {
  test(" not be able to create an appointment without a patient or with an invalid patient", async () => {
    const createAppointmentUseCase = new CreateAppointmentUseCase();

    expect(async () => {
      await createAppointmentUseCase.execute({
        patientId: "INVALID_PATIENT",
        doctorId: generateUUID(),
        date: new Date(),
      });
    }).rejects.toThrow("Patient does not exists");
  });
});
