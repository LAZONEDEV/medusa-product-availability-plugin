import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import {
  toJSONTransformer,
  toNumberTransformer,
} from "@/utils/validator/tranformers";

export class GetAvailabilitiesDto {
  @Transform(toJSONTransformer)
  @IsOptional()
  @IsBoolean()
  includeExpired?: boolean;

  @Transform(toNumberTransformer)
  @IsNumber()
  @IsOptional()
  page?: number;

  @Transform(toNumberTransformer)
  @IsNumber()
  @IsOptional()
  limit?: number;
}
