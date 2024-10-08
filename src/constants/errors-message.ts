export enum ErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  UNPROCESSABLE_ENTITY_ERROR = "UNPROCESSABLE_ENTITY_ERROR",
}

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.INTERNAL_SERVER_ERROR]: "Internal server error",
  [ErrorCode.VALIDATION_ERROR]: "Validation error",
  [ErrorCode.BAD_REQUEST]: "Bad request",
  [ErrorCode.NOT_FOUND]: "Not found",
  [ErrorCode.UNPROCESSABLE_ENTITY_ERROR]: "Unprocessable entity error",
};
