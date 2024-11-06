import { MedusaRequest } from "@medusajs/medusa";
import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";
import { QueryPaginationDto } from "@/utils/dtos/QueryPaginationDto";
import AvailabilitySettingsService from "@/services/availability-settings";

export const getSettings = createRequestHandler(async (req: MedusaRequest) => {
  try {
    const queries = await validator(QueryPaginationDto, req.query);

    const availabilitySettingsService =
      req.scope.resolve<AvailabilitySettingsService>(
        "availabilitySettingsService",
      );

    const settings = await availabilitySettingsService.getAll(queries);

    return settings;
  } catch (error) {
    throw error;
  }
});
