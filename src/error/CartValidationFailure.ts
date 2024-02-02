import UnprocessableEntityError from "./UnprocessableEntityError";

class CartValidationError extends UnprocessableEntityError {
  constructor(message: string) {
    super(message);
  }
}

export default CartValidationError;
