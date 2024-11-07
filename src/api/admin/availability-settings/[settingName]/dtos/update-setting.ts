import { AvailabilityConfigNames } from "@/enums/availability-settings-name";
import { IsEnum, IsObject } from "class-validator";

export class UpdateSettingDto {
  @IsEnum(AvailabilityConfigNames)
  settingName: AvailabilityConfigNames;

  @IsObject()
  value: Record<string, string>;
}
