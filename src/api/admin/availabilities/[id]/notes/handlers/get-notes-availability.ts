import { MedusaRequest } from "@medusajs/medusa";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";

export const getAvailabilityNotes = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const id = req.params.id;

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      const availability = await availabilityService.getAvailabilitesNotes(id);

      return availability;
    } catch (error) {
      throw error;
    }
  },
);
