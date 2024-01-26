import { IsArray, ArrayNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DoesExist } from "@/utils/validator/is-exist";
import { IsUniquenessOnList } from "@/utils/validator/is-unity-on-list";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import { CreateAvailabilityProductDto } from "../../availabilities/dtos/create-availability.dtos";

export class CreateProductsAvailabilitiesDto {
  @DoesExist("Availability", "id", {
    message: ValidationErrorMessage.availabilityNotFound,
  })
  availabilityId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAvailabilityProductDto)
  @IsUniquenessOnList("productId", {
    message: ValidationErrorMessage.noDuplicateProdAvailability,
  })
  availabilityProducts: CreateAvailabilityProductDto[];
}
