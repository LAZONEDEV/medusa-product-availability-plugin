import { FieldError } from "@/types/error";
import { ValidationError } from "class-validator";

export const formatErrorMessage = (message: Record<string, string>): string => {
  return Object.values(message).join(", ");
};

export const formatError = (errors: ValidationError[]): FieldError[] => {
  return errors.map((error) => {
    const childrenErrors =
      error.children?.length && error.children?.length > 0
        ? formatError(error.children)
        : [];
    const message = error.constraints && formatErrorMessage(error.constraints);

    return {
      message,
      children: childrenErrors,
      field: error.property,
    };
  });
};
