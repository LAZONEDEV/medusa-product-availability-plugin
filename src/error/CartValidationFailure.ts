import { ErrorCodeMessageObj } from "@/types/error";

class CartValidationError extends Error {
  public code: string;
  public payload?: object;

  constructor(errorInfo: ErrorCodeMessageObj, payload?: object) {
    super(errorInfo.message);
    this.code = errorInfo.code;
    this.payload = payload;
  }
}

export default CartValidationError;
