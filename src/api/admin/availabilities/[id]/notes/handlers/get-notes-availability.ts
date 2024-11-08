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

      const availabilityNote =
        await availabilityService.getAvailabilitesNotes(id);

      return availabilityNote;
    } catch (error) {
      throw error;
    }
  },
);
