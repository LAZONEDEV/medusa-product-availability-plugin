import { TransactionBaseService } from "@medusajs/medusa";
import { AvailabilitySettings } from "../models/availability-setting";
import { QueryPaginationDto } from "@/utils/dtos/QueryPaginationDto";
import { computeOffsetAndPage } from "@/utils/computeOffsetAndPage";
import { AvailabilityConfigNames } from "@/enums/availability-settings-name";

class AvailabilitySettingsService extends TransactionBaseService {
  getAll(query: QueryPaginationDto) {
    const [queryLimit, skipOffset] = computeOffsetAndPage(
      query.limit,
      query.page,
    );

    const availabilitySettingsRepo =
      this.activeManager_.getRepository(AvailabilitySettings);

    return availabilitySettingsRepo.find({
      skip: skipOffset,
      take: queryLimit,
    });
  }

  async updateSetting(
    settingName: AvailabilityConfigNames,
    newValue: Record<string, string>,
  ): Promise<void> {
    const availabilitySettingsRepo =
      this.activeManager_.getRepository(AvailabilitySettings);

    const updatedValue = await availabilitySettingsRepo.update(
      {
        configName: settingName,
      },
      {
        value: newValue,
      },
    );

    if (!updatedValue.affected) {
      const newEntry = await availabilitySettingsRepo.create({
        configName: settingName,
        value: newValue,
      });
      await availabilitySettingsRepo.save(newEntry);
    }
  }
}

export default AvailabilitySettingsService;
