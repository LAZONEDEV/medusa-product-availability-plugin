import { IsString } from "class-validator";

export class CheckProductAvailableOnAvailabilityDto {
  @IsString()
  availabilityId: string;
}
