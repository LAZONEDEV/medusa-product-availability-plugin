import { MedusaRequest } from "@medusajs/medusa";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";
import { GetAvailabilitiesDto } from "../dtos/get-availabilities.dtos";
import { validator } from "@/utils/validator/validator";

export const getAvailabilities = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const queries = await validator(GetAvailabilitiesDto, req.query);

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      const availabilities =
        await availabilityService.getAvailabilitiesForAdmin(queries, {
          availabilityProducts: {
            product: true,
          },
        });

      return availabilities;
    } catch (error) {
      throw error;
    }
  },
);
