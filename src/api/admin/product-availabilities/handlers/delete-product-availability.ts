import AvailabilityProductService from "@/services/availability-product";
import { createRequestHandler } from "@/utils/request-handler";
import { MedusaRequest } from "@medusajs/medusa";

export const deleteProductAvailability = createRequestHandler(
  async (req: MedusaRequest) => {
    const { id } = req.params;

    const productAvailabilityService =
      req.scope.resolve<AvailabilityProductService>(
        "availabilityProductService",
      );
    return productAvailabilityService.delete(id);
  },
);
