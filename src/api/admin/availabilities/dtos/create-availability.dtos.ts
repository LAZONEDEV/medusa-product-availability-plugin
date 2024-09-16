import {
  IsDateString,
  IsString,
  IsArray,
  Min,
  Max,
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { DoesNotExist, DoesExist } from "@/utils/validator/is-exist";
import { IsUniquenessOnList } from "@/utils/validator/is-unity-on-list";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import { IsNotPastDate } from "@/utils/validator/is-not-past-date";

const arbitrarySmallIntMax = 30_000;
const minAvailableQuantity = 1;

export class CreateAvailabilityDto {
  @DoesNotExist("Availability", "date", {
    message: ValidationErrorMessage.availabilityAlreadyExist,
  })
  @IsNotPastDate({
    message: ValidationErrorMessage.canNotCreateAvailabilityForPast,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
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
  @DoesExist("Product", "id", {
    message: ValidationErrorMessage.productNotExists,
  })
  productId: string;

  @IsNumber()
  @IsOptional()
  @Min(minAvailableQuantity)
  @Max(arbitrarySmallIntMax)
  quantity: number;
}
