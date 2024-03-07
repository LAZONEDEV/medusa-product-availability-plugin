import { ErrorCode } from "@/constants/errors-message";

class ErrorWithCode extends Error {
  public code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

export default ErrorWithCode;
