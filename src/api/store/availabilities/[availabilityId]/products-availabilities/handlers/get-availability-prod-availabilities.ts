import AvailabilityProductService from "@/services/availability-product";
import { createRequestHandler } from "@/utils/request-handler";
import { MedusaRequest } from "@medusajs/medusa";

export const getAvailabilityProductAvailabilities = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const availabilityId = req.params.availabilityId;

      const productAvailabilityService =
        req.scope.resolve<AvailabilityProductService>(
          "availabilityProductService",
        );

      return productAvailabilityService.getAvailabilityProducts(availabilityId);
    } catch (error) {
      throw error;
    }
  },
);
