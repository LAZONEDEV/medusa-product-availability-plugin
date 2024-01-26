import { ErrorCode } from "@/constants/errors-message";
import { FieldError } from "@/types/error";

class ValidationError extends Error {
  code: ErrorCode = ErrorCode.VALIDATION_ERROR;
  payload: FieldError[];

  constructor(payload: FieldError[] = []) {
    super(ErrorCode.VALIDATION_ERROR);
    this.payload = payload;
  }
}

export default ValidationError;
