import {
  IsDateString,
  IsString,
  IsArray,
  Min,
  Max,
  ArrayNotEmpty,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { DoesNotExists, IsExists } from "@/utils/validator/is-exist";
import { IsUniquenessOnList } from "@/utils/validator/is-unity-on-list";
import { ValidationErrorMessage } from "@/constants/validation-error-message";

const arbitrarySmallIntMax = 30_000;
const minAvailableQuantity = 1;

export class CreateAvailabilityDto {
  @IsDateString()
  @DoesNotExists("Availability", "date", {
    message: ValidationErrorMessage.availabilityAlreadyExist,
  })
  date: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAvailabilityProductDto)
  @IsUniquenessOnList("productId", {
    message: ValidationErrorMessage.noDuplicateProdAvailability,
  })
  availabilityProducts: CreateAvailabilityProductDto[];
}

export class CreateAvailabilityProductDto {
  @IsString()
  @IsExists("Product", "id", {
    message: ValidationErrorMessage.productNotExists,
  })
  productId: string;

  @IsNumber()
  @Min(minAvailableQuantity)
  @Max(arbitrarySmallIntMax)
  quantity: number;
}
