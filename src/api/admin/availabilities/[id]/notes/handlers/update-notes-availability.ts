import { MedusaRequest } from "@medusajs/medusa";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";
import { UpdateAvailabilityNotesDto } from "../dtos/notes-availability.dtos";

export const updateAvailabilityNote = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const id = req.params.id;
      const payload = await validator(UpdateAvailabilityNotesDto, {
        ...(req.body as object),
        availabilityId: id,
      });

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      return availabilityService.updateNotes(payload);
    } catch (error) {
      throw error;
    }
  },
);
