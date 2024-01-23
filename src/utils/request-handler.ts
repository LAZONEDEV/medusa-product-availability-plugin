import BadRequestError from "@/error/BadRequestError";
import ValidationError from "@/error/ValidationError";
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

type RequestHandlerType = (
  req: MedusaRequest,
  res: MedusaResponse,
) => Promise<unknown>;

export const createRequestHandler = (handler: RequestHandlerType) => {
  return async (req: MedusaRequest, res: MedusaResponse) => {
    try {
      const result = await handler(req, res);
      res.json({ data: result });
    } catch (error) {
      console.error(error);

      const response = {
        message: error.message,
        code: error.code,
      };

      if (error instanceof BadRequestError) {
        res.status(400).json(response);
        return;
      }

      if (error instanceof ValidationError) {
        res.status(400).json({
          ...response,
          errors: error.payload,
        });
        return;
      }

      res.status(500).json(response);
    }
  };
};
