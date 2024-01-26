import { ErrorCode } from "@/constants/errors-message";

class UnprocessableEntityError extends Error {
  code: ErrorCode = ErrorCode.UNPROCESSABLE_ENTITY_ERROR;

  constructor(message: string) {
    super(message);
  }
}

export default UnprocessableEntityError;
