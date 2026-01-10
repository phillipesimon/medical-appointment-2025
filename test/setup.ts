import { beforeAll, afterAll } from "vitest";
import { randomUUID } from "crypto";
import { execSync } from "node:child_process";
import { Client } from "pg";

const schemaDatabaseTest = randomUUID();

function generateDatabaseURL() {
  const url = new URL(process.env.DATABASE_URL!);
  url.searchParams.set("schema", schemaDatabaseTest);
  return url.toString();
}

beforeAll(async () => {
  const databaseURL = generateDatabaseURL();
  process.env.DATABASE_URL = databaseURL;

  console.log("DATABASE", databaseURL);

  execSync("npx prisma db push", { stdio: "inherit" });
});

afterAll(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(`DROP SCHEMA IF EXISTS "${schemaDatabaseTest}" CASCADE`);
  await client.end();
});
