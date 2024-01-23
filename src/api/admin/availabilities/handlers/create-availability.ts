import { MedusaRequest } from "@medusajs/medusa";
import { CreateAvailabilityDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";

export const createAvailability = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const payload = await validator(CreateAvailabilityDto, req.body);
      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      const availability = await availabilityService.create(payload);

      return availability;
    } catch (error) {
      throw error;
    }
  },
);
