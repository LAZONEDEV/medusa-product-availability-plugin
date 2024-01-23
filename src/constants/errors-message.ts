export enum ErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
}

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.INTERNAL_SERVER_ERROR]: "Internal server error",
  [ErrorCode.VALIDATION_ERROR]: "Validation error",
};
