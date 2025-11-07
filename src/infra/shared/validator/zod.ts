import { ZodError, ZodType } from "zod";
import { ValidationSchemaError } from "../../../error/validation-schema.error";

export type ErrorSchema = {
  field: (string | number)[];
  message: string;
};

export const validatorSchema = <T>(schema: ZodType<T>, payload: unknown): T => {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: ErrorSchema[] = error.issues.map((issue) => ({
        field: issue.path as (string | number)[],
        message: issue.message,
      }));

      throw new ValidationSchemaError("ERROR_SCHEMA", errors);
    }

    // se o erro não for do zod, relança
    throw error;
  }
};
