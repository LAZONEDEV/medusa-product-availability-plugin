import { MedusaRequest } from "@medusajs/medusa";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";

export const getAvailability = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const id = req.params.id;

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      const availability = await availabilityService.findOne(id);

      return availability;
    } catch (error) {
      throw error;
    }
  },
);
