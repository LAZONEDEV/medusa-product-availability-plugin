import { MedusaRequest } from "@medusajs/medusa";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";

export const deleteAvailability = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const id = req.params.id;

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      return availabilityService.delete(id);
    } catch (error) {
      throw error;
    }
  },
);
