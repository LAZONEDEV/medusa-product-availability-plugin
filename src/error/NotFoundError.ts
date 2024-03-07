import { ErrorCode } from "@/constants/errors-message";
import ErrorWithCode from "./ErrorWithCode";

class NotFoundError extends ErrorWithCode {
  constructor(message: string) {
    super(ErrorCode.NOT_FOUND, message);
  }
}

export default NotFoundError;
