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
import { IsExist } from "@/utils/validator/is-exist";

const arbitrarySmallIntMax = 30_000;
const minAvailableQuantity = 1;

export class CreateAvailabilityDto {
  @IsDateString()
  date: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAvailabilityProductDto)
  availabilityProducts: CreateAvailabilityProductDto[];
}

export class CreateAvailabilityProductDto {
  @IsString()
  @IsExist("Product", "id", {
    message: "product with id $value does not exist",
  })
  productId: string;

  @IsNumber()
  @Min(minAvailableQuantity)
  @Max(arbitrarySmallIntMax)
  quantity: number;
}
