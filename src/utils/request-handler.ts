import BadRequestError from "@/error/BadRequestError";
import CartValidationError from "@/error/CartValidationFailure";
import NotFoundError from "@/error/NotFoundError";
import UnprocessableEntityError from "@/error/UnprocessableEntityError";
import ValidationError from "@/error/ValidationError";
import { ApiErrorResponseType } from "@/types/api";
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ErrorWithCode from "@/error/ErrorWithCode";
import { QueryFailedError } from "typeorm";
import { requestErrorLogger } from "./request-error-logger";
import { isProdEnv } from "@/constants/env-mode";

type RequestHandlerType = (
  req: MedusaRequest,
  res: MedusaResponse,
) => Promise<unknown>;

const getErrorStatusCode = (error: unknown): number => {
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

const getErrorMessage = (error: unknown): string => {
  // do not display db errors in production
  if (error instanceof QueryFailedError && isProdEnv) {
    return "Internal Server Error";
  }

  return error instanceof Error ? error.message : String(error);
};

export const createRequestHandler = (handler: RequestHandlerType) => {
  return async (req: MedusaRequest, res: MedusaResponse) => {
    try {
      const result = await handler(req, res);
      res.json({ data: result });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      const errorStatusCode = getErrorStatusCode(error);

      const response: ApiErrorResponseType = {
        message: errorMessage,
        code: error instanceof ErrorWithCode ? error.code : "",
      };

      if (error instanceof ValidationError) {
        response.errors = error.payload;
      }

      if (error instanceof CartValidationError) {
        response.payload = error.payload;
      }

      const logger = req.scope.resolve("logger");
      requestErrorLogger(error, logger);

      res.status(errorStatusCode).json(response);
    }
  };
};
