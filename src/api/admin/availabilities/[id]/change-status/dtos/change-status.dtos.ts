import { IsEnum } from "class-validator";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import { DoesExist } from "@/utils/validator/is-exist";
import { AvailabilityStatus } from "@/enums";

export class ChangeAvailabilityStatusDto {
  @DoesExist("Availability", "id", {
    message: ValidationErrorMessage.availabilityNotFound,
  })
  availabilityId: string;

  @IsEnum(AvailabilityStatus)
  status: AvailabilityStatus;
}
