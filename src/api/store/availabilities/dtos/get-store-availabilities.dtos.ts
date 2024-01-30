import { QueryPaginationDto } from "@/utils/dtos/QueryPaginationDto";
import { IsString, IsOptional } from "class-validator";

export class GetStoreAvailabilitiesDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  forProduct?: string;
}
