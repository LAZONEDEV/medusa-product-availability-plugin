import { MedusaRequest } from "@medusajs/medusa";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";
import { GetStoreAvailabilitiesDto } from "../dtos/get-store-availabilities.dtos";

export const getStoreAvailabilities = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const queries = await validator(GetStoreAvailabilitiesDto, req.query);

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      const availabilities =
        await availabilityService.getAvailabilitiesForStore(queries);

      return availabilities;
    } catch (error) {
      throw error;
    }
  },
);
