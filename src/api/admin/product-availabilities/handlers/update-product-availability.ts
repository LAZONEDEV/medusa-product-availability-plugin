import AvailabilityProductService from "@/services/availability-product";
import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";
import { MedusaRequest } from "@medusajs/medusa";
import UpdateProductAvailabilityDto from "../dtos/update-product-availability.dtos";

export const updateProductAvailability = createRequestHandler(
  async (req: MedusaRequest) => {
    const payload = await validator<UpdateProductAvailabilityDto>(
      UpdateProductAvailabilityDto,
      req.body,
    );
    const { id } = req.params;

    const productAvailabilityService =
      req.scope.resolve<AvailabilityProductService>(
        "availabilityProductService",
      );
    return productAvailabilityService.update(id, payload);
  },
);
