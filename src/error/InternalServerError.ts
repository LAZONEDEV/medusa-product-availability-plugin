import { ErrorCode } from "@/constants/errors-message";

class InternalServerError extends Error {
  code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR_MESSAGE;

  constructor() {
    super(ErrorCode.INTERNAL_SERVER_ERROR_MESSAGE);
  }
}

export default InternalServerError;
