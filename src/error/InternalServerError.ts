import { ErrorCode, ErrorMessages } from "@/constants/errors-message";
import ErrorWithCode from "./ErrorWithCode";

class InternalServerError extends ErrorWithCode {
  constructor() {
    super(ErrorCode.INTERNAL_SERVER_ERROR, ErrorMessages.INTERNAL_SERVER_ERROR);
  }
}

export default InternalServerError;
