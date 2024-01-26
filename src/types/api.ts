import { FieldError } from "./error";

export type ApiErrorResponseType = {
  message: string;
  code: string;
  errors?: FieldError[];
};

export type OperationResult = {
  success: boolean;
};
