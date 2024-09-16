import { Availability } from "@/models/availability";

export interface GetAvailabilitiesResponseDto {
  availabilities: Availability[];
  totalCount: number;
}
