import { ErrorCodeMessageObj } from "@/types/error";
import { ValidationErrorMessage } from "./validation-error-message";

export enum CartValidationErrorCode {
  AVAILABILITY_EXPIRED = "AVAILABILITY_EXPIRED",
  AVAILABILITY_INACTIVE = "AVAILABILITY_INACTIVE",
  AVAILABILITY_NOT_SET_ON_CART = "AVAILABILITY_NOT_SET_ON_CART",
  PRODUCT_NOT_AVAILABLE_ON_AVAILABILITY = "PRODUCT_NOT_AVAILABLE_ON_AVAILABILITY",
  PRODUCT_NO_LONGER_AVAILABLE_ON_AVAILABILITY = "PRODUCT_NO_LONGER_AVAILABLE_ON_AVAILABILITY",
  AVAILABLE_QUANTITY_EXCEEDED = "AVAILABLE_QUANTITY_EXCEEDED",
}

export const cartCompletionErrorsInfo: Partial<
  Record<CartValidationErrorCode, ErrorCodeMessageObj>
> = {
  AVAILABILITY_EXPIRED: {
    code: "AVAILABILITY_EXPIRED",
    message: ValidationErrorMessage.cartAvailabilityExpired,
  },
  AVAILABILITY_INACTIVE: {
    code: "AVAILABILITY_INACTIVE",
    message: ValidationErrorMessage.cartAvailabilityIsInactive,
  },
  AVAILABILITY_NOT_SET_ON_CART: {
    code: "AVAILABILITY_NOT_SET_ON_CART",
    message: ValidationErrorMessage.availabilityNotSetOnCart,
  },
};
