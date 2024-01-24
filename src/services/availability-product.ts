import { TransactionBaseService } from "@medusajs/medusa";
import type { CreateAvailabilityProductDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import { AvailabilityProduct } from "@/models/product-availability";
import { EntityManager, QueryFailedError } from "typeorm";
import { checkProductAvailabilityDuplicationError } from "@/utils/check-error";
import BadRequestError from "@/error/BadRequestError";
import { ValidationErrorMessage } from "@/constants/validation-error-message";

class AvailabilityProductService extends TransactionBaseService {
  async create(
    items: CreateAvailabilityProductDto[],
    availabilityId: string,
    entityManager: EntityManager,
  ): Promise<AvailabilityProduct[]> {
    const itemsWithAvailabilityId = items.map(({ productId, quantity }) => ({
      quantity,
      product: { id: productId },
      availability: { id: availabilityId },
    }));

    try {
      const availabilityProdRepo =
        entityManager.getRepository(AvailabilityProduct);

      const availabilities = availabilityProdRepo.create(
        itemsWithAvailabilityId,
      );

      const result = await availabilityProdRepo.save(availabilities);
      return result;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        checkProductAvailabilityDuplicationError(error)
      ) {
        throw new BadRequestError(
          ValidationErrorMessage.noDuplicateProdAvailability,
        );
      }

      throw error;
    }
  }
}

export default AvailabilityProductService;
