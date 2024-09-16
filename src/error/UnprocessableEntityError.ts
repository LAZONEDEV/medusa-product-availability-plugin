import { ErrorCode } from "@/constants/errors-message";
import ErrorWithCode from "./ErrorWithCode";

class UnprocessableEntityError extends ErrorWithCode {
  constructor(message: string) {
    super(ErrorCode.UNPROCESSABLE_ENTITY_ERROR, message);
  }
}

export default UnprocessableEntityError;
