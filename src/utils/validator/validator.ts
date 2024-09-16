import ValidationError from "@/error/ValidationError";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { formatError } from "./format-error";

export async function validator<T, V = unknown>(
  typedClass: ClassConstructor<T>,
  plain: V,
): Promise<T> {
  const toValidate = plainToInstance(typedClass, plain);

  const errors = await validate(toValidate as object, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors?.length) {
    const errorsPayload = formatError(errors);
    throw new ValidationError(errorsPayload);
  }

  return toValidate;
}
