import { TransactionBaseService } from "@medusajs/medusa";
import type { CreateAvailabilityProductDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import { AvailabilityProduct } from "@/models/product-availability";
import { EntityManager, QueryFailedError } from "typeorm";
import { checkProductAvailabilityDuplicationError } from "@/utils/check-error";
import BadRequestError from "@/error/BadRequestError";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import UpdateProductAvailabilityDto from "@/api/admin/product-availabilities/dtos/update-product-availability.dtos";
import NotFoundError from "@/error/NotFoundError";
import UnprocessableEntityError from "@/error/UnprocessableEntityError";
import { CreateProductsAvailabilitiesDto } from "@/api/admin/product-availabilities/dtos/create-product-availabilities.dtos";
import {
  CheckProductAvailableOnAvailabilityResult,
  OperationResult,
} from "@/types/api";
import { getStoreTimeZoneCurrentDateStartOfDay } from "@/utils/date/getStartOfDay";

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

  async getAvailabilityProducts(availabilityId: string) {
    try {
      const availabilityProdRepo =
        this.activeManager_.getRepository(AvailabilityProduct);

      return availabilityProdRepo.find({
        relations: {
          product: {
            variants: {
              prices: true,
            },
          },
        },
        where: {
          availability: {
            id: availabilityId,
          },
        },
      });
    } catch (error) {
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

  async delete(id: string): Promise<OperationResult> {
    const availabilityProdRepo =
      this.activeManager_.getRepository(AvailabilityProduct);

    const record = await availabilityProdRepo.findOneByOrFail({ id });

    if (record?.orderedQuantity > 0) {
      throw new UnprocessableEntityError(
        ValidationErrorMessage.cantDeleteProductAvailabilityThatHaveOrder,
      );
    }

    const deletionResult = await availabilityProdRepo.delete({ id });

    return deletionResult.affected && deletionResult.affected > 0
      ? { success: true }
      : { success: false };
  }

  async update(
    id: string,
    data: UpdateProductAvailabilityDto,
  ): Promise<OperationResult> {
    const availabilityProdRepo =
      this.activeManager_.getRepository(AvailabilityProduct);

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
    if (
      new Date(productAvailability.availability.date) <
      getStoreTimeZoneCurrentDateStartOfDay()
    ) {
      throw new UnprocessableEntityError(
        ValidationErrorMessage.availabilityAlreadyExpired,
      );
    }

    // when quantity is `null` that means quantity is unlimited
    if (data.quantity !== null) {
      // ensure that the new quantity is greater or equal than placed order quantities
      const placedOrdersCount = productAvailability.orderedQuantity;

      if (data.quantity < placedOrdersCount) {
        throw new UnprocessableEntityError(
          ValidationErrorMessage.newAvailableQuantityNotBeLessThanPlacedQuantity,
        );
      }
    }

    const updateResult = await availabilityProdRepo.update(
      { id: id },
      { quantity: data.quantity },
    );

    return updateResult.affected && updateResult.affected > 0
      ? { success: true }
      : { success: false };
  }

  async existsOneFor(
    productId: string,
    availabilityId: string,
  ): Promise<CheckProductAvailableOnAvailabilityResult> {
    const availabilityProdRepo =
      this.activeManager_.getRepository(AvailabilityProduct);

    const exists = await availabilityProdRepo.existsBy({
      availability: {
        id: availabilityId,
      },
      product: {
        id: productId,
      },
    });

    return {
      exists,
    };
  }
}

export default AvailabilityProductService;
