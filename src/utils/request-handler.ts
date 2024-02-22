import BadRequestError from "@/error/BadRequestError";
import CartValidationError from "@/error/CartValidationFailure";
import NotFoundError from "@/error/NotFoundError";
import UnprocessableEntityError from "@/error/UnprocessableEntityError";
import ValidationError from "@/error/ValidationError";
import { ApiErrorResponseType } from "@/types/api";
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

type RequestHandlerType = (
  req: MedusaRequest,
  res: MedusaResponse,
) => Promise<unknown>;

const getErrorStatusCode = (error: Error): number => {
  if (error instanceof UnprocessableEntityError) {
    return 422;
  }

  if (error instanceof NotFoundError) {
    return 404;
  }

  if (
    error instanceof BadRequestError ||
    error instanceof ValidationError ||
    error instanceof CartValidationError
  ) {
    return 400;
  }

  return 500;
};

export const createRequestHandler = (handler: RequestHandlerType) => {
  return async (req: MedusaRequest, res: MedusaResponse) => {
    try {
      const result = await handler(req, res);
      res.json({ data: result });
    } catch (error) {
      console.error(error);

      const errorStatusCode = getErrorStatusCode(error);

      const response: ApiErrorResponseType = {
        message: error.message,
        code: error.code,
      };

      if (error instanceof ValidationError) {
        response.errors = error.payload;
      }

      if (error instanceof CartValidationError) {
        response.payload = error.payload;
      }

      res.status(errorStatusCode).json(response);
    }
  };
};
