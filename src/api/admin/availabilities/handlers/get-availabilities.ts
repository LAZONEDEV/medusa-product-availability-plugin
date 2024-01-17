import { MedusaRequest, validator } from "@medusajs/medusa";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";
import { GetAvailabilitiesDto } from "../dtos/get-availabilities.dtos";

export const getAvailabilities = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const queries = await validator(GetAvailabilitiesDto, req.query);

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      const availabilities = await availabilityService.get(queries);

      return availabilities;
    } catch (error) {
      throw error;
    }
  },
);
