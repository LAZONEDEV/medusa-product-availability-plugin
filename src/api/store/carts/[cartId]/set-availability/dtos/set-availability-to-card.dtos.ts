import { ValidationErrorMessage } from "@/constants/validation-error-message";
import { DoesExist } from "@/utils/validator/is-exist";
import { IsString } from "class-validator";

export class SetAvailabilityToCartDto {
  @IsString()
  @DoesExist("Availability", "id", {
    message: ValidationErrorMessage.availabilityNotFound,
  })
  availabilityId: string;
}
