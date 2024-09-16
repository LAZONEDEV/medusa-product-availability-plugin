import { IsBoolean, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { toJSONTransformer } from "@/utils/validator/tranformers";
import { QueryPaginationDto } from "@/utils/dtos/QueryPaginationDto";

export class GetAvailabilitiesDto extends QueryPaginationDto {
  @Transform(toJSONTransformer)
  @IsOptional()
  @IsBoolean()
  includeExpired?: boolean;
}
