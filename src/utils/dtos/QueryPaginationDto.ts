import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { toNumberTransformer } from "@/utils/validator/tranformers";

export class QueryPaginationDto {
  @Transform(toNumberTransformer)
  @IsNumber()
  @IsOptional()
  page?: number;

  @Transform(toNumberTransformer)
  @IsNumber()
  @IsOptional()
  limit?: number;
}
