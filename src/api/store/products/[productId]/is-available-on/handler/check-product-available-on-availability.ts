import AvailabilityProductService from "@/services/availability-product";
import { createRequestHandler } from "@/utils/request-handler";
import { MedusaRequest } from "@medusajs/medusa";
import { validator } from "@/utils/validator/validator";
import { CheckProductAvailableOnAvailabilityDto } from "../dtos/check-product-available-on-availability.dto";

export const checkProductIsAvailableOnAvailability = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const productId = req.params.productId;
      const queries = await validator(
        CheckProductAvailableOnAvailabilityDto,
        req.query,
      );

      const productAvailabilityService =
        req.scope.resolve<AvailabilityProductService>(
          "availabilityProductService",
        );

      return productAvailabilityService.existsOneFor(
        productId,
        queries.availabilityId,
      );
    } catch (error) {
      throw error;
    }
  },
);
