import { IsNumber, IsOptional } from "class-validator";

class UpdateProductAvailabilityDto {
  @IsNumber()
  @IsOptional()
  quantity: number | null;
}

export default UpdateProductAvailabilityDto;
