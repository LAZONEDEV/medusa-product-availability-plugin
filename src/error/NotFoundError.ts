import { ErrorCode } from "@/constants/errors-message";

class NotFoundError extends Error {
  code: ErrorCode = ErrorCode.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

export default NotFoundError;
