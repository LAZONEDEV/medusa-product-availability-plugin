import { MedusaRequest } from "@medusajs/medusa";
import { createRequestHandler } from "@/utils/request-handler";
import AvailabilitySettingsService from "@/services/availability-settings";
import { UpdateSettingDto } from "../dtos/update-setting";
import { validator } from "@/utils/validator/validator";

export const updateAvailability = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const settingName = req.params.settingName;
      const payload = await validator(UpdateSettingDto, {
        settingName,
        value: req.body,
      });

      const availabilitySettingsService =
        req.scope.resolve<AvailabilitySettingsService>(
          "availabilitySettingsService",
        );

      await availabilitySettingsService.updateSetting(
        payload.settingName,
        payload.value,
      );

      return {
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
);
