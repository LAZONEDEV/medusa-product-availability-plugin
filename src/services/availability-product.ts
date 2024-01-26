import { Order, TransactionBaseService } from "@medusajs/medusa";
import type { CreateAvailabilityProductDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import { AvailabilityProduct } from "@/models/product-availability";
import { EntityManager, QueryFailedError } from "typeorm";
import { checkProductAvailabilityDuplicationError } from "@/utils/check-error";
import BadRequestError from "@/error/BadRequestError";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import UpdateProductAvailabilityDto from "@/api/admin/product-availabilities/dtos/update-product-availability.dtos";
import NotFoundError from "@/error/NotFoundError";
import AvailabilityProductRepository from "@/repositories/product-availability";
import UnprocessableEntityError from "@/error/UnprocessableEntityError";
import { CreateProductsAvailabilitiesDto } from "@/api/admin/product-availabilities/dtos/create-product-availabilities.dtos";

class AvailabilityProductService extends TransactionBaseService {
  async createByEntityManager(
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

  async create(data: CreateProductsAvailabilitiesDto) {
    return this.atomicPhase_((entityManager) => {
      return this.createByEntityManager(
        data.availabilityProducts,
        data.availabilityId,
        entityManager,
      );
    });
  }

  async update(id: string, data: UpdateProductAvailabilityDto) {
    const availabilityProdRepo = this.activeManager_.withRepository(
      AvailabilityProductRepository,
    );

    const productAvailability = await availabilityProdRepo.findOne({
      where: { id },
      relations: {
        availability: true,
      },
    });

    if (!productAvailability) {
      throw new NotFoundError(
        ValidationErrorMessage.productAvailabilityNotFound,
      );
    }

    // prevent availability updates for products availability whose parent availability has expired
    if (new Date(productAvailability.availability.date) < new Date()) {
      throw new UnprocessableEntityError(
        ValidationErrorMessage.availabilityAlreadyExpired,
      );
    }

    const orderRepository = this.activeManager_.getRepository(Order);

    // when quantity is `null` that means quantity is unlimited
    if (data.quantity !== null) {
      // ensure that the new quantity is greater or equal than placed order quantities
      const passedCommand = await availabilityProdRepo.getPlacedOrderQuantity(
        id,
        orderRepository,
      );

      if (data.quantity < passedCommand) {
        throw new UnprocessableEntityError(
          ValidationErrorMessage.newAvailableQuantityNotBeLessThanPlacedQuantity,
        );
      }
    }

    const updateResult = await availabilityProdRepo.update(
      { id: id },
      { quantity: data.quantity },
    );

    return updateResult.affected > 0 ? { success: true } : { success: false };
  }
}

export default AvailabilityProductService;
