import BadRequestError from "@/error/BadRequestError";
import CartValidationError from "@/error/CartValidationFailure";
import ValidationError from "@/error/ValidationError";
import NotFoundError from "./NotFoundError";
import UnprocessableEntityError from "./UnprocessableEntityError";

export const nonCriticalErrors = [
  BadRequestError,
  ValidationError,
  CartValidationError,
  NotFoundError,
  UnprocessableEntityError,
];
