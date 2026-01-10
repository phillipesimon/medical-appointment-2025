import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../app";
import { randomUUID } from "crypto";

describe("Patient", () => {
  it("Should be able to create a new patient", async () => {
    const username = `user_${randomUUID()}`;

    const result = await request(app)
      .post("/patients")
      .send({
        name: "user_supertest",
        username,
        password: "user_password",
        email: `${username}@mail.com`,
        document: randomUUID(),
      });

    expect(result.statusCode).eq(200);
    expect(result.body).toHaveProperty("id");
  });
});
