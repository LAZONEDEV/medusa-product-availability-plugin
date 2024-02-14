import AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";
import { MedusaRequest } from "@medusajs/medusa";

export const getAvailabilityById = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const availabilityId = req.params.availabilityId;

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      return availabilityService.findOne(availabilityId, false);
    } catch (error) {
      throw error;
    }
  },
);
