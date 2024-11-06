import { ValidationErrorMessage } from "@/constants/validation-error-message";
import { DoesExist } from "@/utils/validator/is-exist";
import { IsString, IsOptional } from "class-validator";

export class UpdateAvailabilityNotesDto {
  @DoesExist("Availability", "id", {
    message: ValidationErrorMessage.availabilityNotFound,
  })
  availabilityId: string;

  @IsOptional()
  @IsString()
  withdrawNote?: string;

  @IsOptional()
  @IsString()
  deliveryNote?: string;
}
