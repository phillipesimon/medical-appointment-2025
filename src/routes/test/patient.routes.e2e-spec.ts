import request from "supertest";
import { describe, it } from "vitest";
import { app } from "../../app";

describe("Patient", () => {
  it("Should be able to create a new patient", () => {
    request(app).post("/patients");
  });
});
