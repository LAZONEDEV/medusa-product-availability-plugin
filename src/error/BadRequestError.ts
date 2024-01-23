import { ErrorCode } from "@/constants/errors-message";

class BadRequestError extends Error {
  code: ErrorCode = ErrorCode.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

export default BadRequestError;
