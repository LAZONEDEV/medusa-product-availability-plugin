import AvailabilityProductService from "@/services/availability-product";
import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";
import { MedusaRequest } from "@medusajs/medusa";
import { CreateProductsAvailabilitiesDto } from "../dtos/create-product-availabilities.dtos";

export const createProductAvailabilities = createRequestHandler(
  async (req: MedusaRequest) => {
    const payload = await validator<CreateProductsAvailabilitiesDto>(
      CreateProductsAvailabilitiesDto,
      req.body,
    );

    const productAvailabilityService =
      req.scope.resolve<AvailabilityProductService>(
        "availabilityProductService",
      );
    return productAvailabilityService.create(payload);
  },
);
