import { ErrorCode } from "@/constants/errors-message";

class InternalServerError extends Error {
  code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR;

  constructor() {
    super(ErrorCode.INTERNAL_SERVER_ERROR);
  }
}

export default InternalServerError;
