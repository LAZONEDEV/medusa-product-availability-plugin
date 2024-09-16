import { ErrorCode, ErrorMessages } from "@/constants/errors-message";
import { FieldError } from "@/types/error";
import ErrorWithCode from "./ErrorWithCode";

class ValidationError extends ErrorWithCode {
  payload: FieldError[];

  constructor(payload: FieldError[] = []) {
    super(ErrorCode.VALIDATION_ERROR, ErrorMessages.VALIDATION_ERROR);
    this.payload = payload;
  }
}

export default ValidationError;
