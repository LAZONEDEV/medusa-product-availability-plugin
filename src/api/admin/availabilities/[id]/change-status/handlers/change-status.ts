import { MedusaRequest } from "@medusajs/medusa";
import type AvailabilityService from "@/services/availability";
import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";
import { ChangeAvailabilityStatusDto } from "../dtos/change-status.dtos";

export const changeAvailabilityStatus = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const id = req.params.id;
      const payload = await validator(ChangeAvailabilityStatusDto, {
        ...(req.body as object),
        availabilityId: id,
      });

      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );

      return availabilityService.changeState(payload);
    } catch (error) {
      throw error;
    }
  },
);
