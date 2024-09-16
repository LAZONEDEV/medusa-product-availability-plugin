import { FieldError } from "./error";

export type ApiErrorResponseType = {
  message: string;
  code: string;
  errors?: FieldError[];
  payload?: object;
};

export type OperationResult = {
  success: boolean;
};

export type CheckProductAvailableOnAvailabilityResult = {
  exists: boolean;
};

export type APIResponse<T> = {
  data: T;
};
