import InternalServerError from "@/error/InternalServerError";
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
      if (error instanceof InternalServerError) {
        res.status(500).json({
          message: error.message,
          code: error.code,
        });
      }

      res.status(500).json({
        message: error.message,
      });
    }
  };
};
