import { TransactionBaseService } from "@medusajs/medusa";
import { Availability } from "@/models/availability";
import { CreateAvailabilityDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import AvailabilityProductService from "./availability-product";
import { GetAvailabilitiesDto } from "@/api/admin/availabilities/dtos/get-availabilities.dtos";
import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  QueryFailedError,
} from "typeorm";
import { GetAvailabilitiesResponseDto } from "@/types/availability";
import BadRequestError from "@/error/BadRequestError";
import { checkAvailabilityDuplicationError } from "@/utils/check-error";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import NotFoundError from "@/error/NotFoundError";
import { QueryPaginationDto } from "@/utils/dtos/QueryPaginationDto";
import { GetStoreAvailabilitiesDto } from "@/api/store/availabilities/dtos/get-store-availabilities.dtos";
import UnprocessableEntityError from "@/error/UnprocessableEntityError";
import { OperationResult } from "@/types/api";
import type { ChangeAvailabilityStatusDto } from "@/api/admin/availabilities/[id]/change-status/dtos/change-status.dtos";
import { Order } from "@/models/order";
import { AvailabilityProduct } from "@/models/product-availability";
import { Logger } from "@medusajs/medusa";
import { ExcludeExpiredAvailabilitiesOperator } from "@/utils/query-operators/exclude-expired-availability-query-operator";

type InjectedDependencies = {
  availabilityProductService: AvailabilityProductService;
  logger: Logger;
};

class AvailabilityService extends TransactionBaseService {
  protected availabilityProductService: AvailabilityProductService;
  protected logger: Logger;

  constructor(config: InjectedDependencies) {
    super(config);
    this.availabilityProductService = config.availabilityProductService;
    this.logger = config.logger;
  }

  private computeOffsetAndPage = (limit = 10, page = 0) => {
    const skipOffset = Math.max(page * limit, 0);

    return [limit, skipOffset] as const;
  };

  private async getWhere(
    query: QueryPaginationDto,
    findOptions: Pick<
      FindManyOptions<Availability>,
      "where" | "relations"
    > = {},
  ) {
    try {
      const availabilityRepo = this.activeManager_.getRepository(Availability);

      const [queryLimit, skipOffset] = this.computeOffsetAndPage(
        query.limit,
        query.page,
      );

      const [availabilities, totalCount] = await availabilityRepo.findAndCount({
        skip: skipOffset,
        take: queryLimit,
        order: { date: "ASC" },
        ...findOptions,
      });

      return { availabilities, totalCount };
    } catch (error) {
      throw error;
    }
  }

  getAvailabilitiesForAdmin(
    query: GetAvailabilitiesDto,
    relations?: FindOptionsRelations<Availability>,
  ): Promise<GetAvailabilitiesResponseDto> {
    const whereClose: FindOneOptions<Availability>["where"] = {};

    // expired availabilities are those whose dates have passed.
    if (!query.includeExpired) {
      whereClose.date = ExcludeExpiredAvailabilitiesOperator();
    }

    return this.getWhere(query, {
      relations,
      where: whereClose,
    });
  }

  getAvailabilitiesForStore(
    query: GetStoreAvailabilitiesDto,
  ): Promise<GetAvailabilitiesResponseDto> {
    const whereClose: FindOneOptions<Availability>["where"] = {
      date: ExcludeExpiredAvailabilitiesOperator(),
    };

    if (query.forProduct) {
      whereClose.availabilityProducts = {
        product: {
          id: query.forProduct,
        },
      };
    }

    return this.getWhere(query, { where: whereClose });
  }

  async create(data: CreateAvailabilityDto) {
    return this.atomicPhase_(async (entityManager) => {
      try {
        const availabilityRepo = entityManager.getRepository(Availability);
        const availability = availabilityRepo.create(data);

        await availabilityRepo.save(availability);

        await this.availabilityProductService.createByEntityManager(
          data.availabilityProducts,
          availability.id,
          entityManager,
        );

        return availability;
      } catch (error) {
        if (
          error instanceof QueryFailedError &&
          checkAvailabilityDuplicationError(error)
        ) {
          throw new BadRequestError(
            ValidationErrorMessage.availabilityAlreadyExist,
          );
        }

        throw error;
      }
    });
  }

  async findOne(id: string, withRelations = true) {
    const availabilityRepo = this.activeManager_.getRepository(Availability);

    const relations: FindOptionsRelations<Availability> = withRelations
      ? {
          availabilityProducts: {
            product: true,
          },
        }
      : {};

    const availability = await availabilityRepo.findOne({
      where: { id },
      relations,
    });

    if (!availability) {
      throw new NotFoundError(ValidationErrorMessage.availabilityNotFound);
    }

    return availability;
  }

  async handleAvailabilityDeletion(
    id: string,
    em: EntityManager,
  ): Promise<OperationResult> {
    try {
      const availabilityRepo = em.getRepository(Availability);
      const availability = await availabilityRepo.findOneOrFail({
        where: { id },
        relations: { orders: true, carts: true },
      });

      if (availability.orders.length > 0) {
        throw new UnprocessableEntityError(
          ValidationErrorMessage.availabilityHasCart,
        );
      }

      // untie relations with carts
      if (availability.carts.length) {
        availability.carts = [];
        await availabilityRepo.save(availability);
      }

      const result = await availabilityRepo.delete({ id });
      return {
        success: result.affected ? result.affected > 0 : false,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<OperationResult> {
    return this.atomicPhase_((em) => this.handleAvailabilityDeletion(id, em));
  }

  async changeState({
    availabilityId,
    status,
  }: ChangeAvailabilityStatusDto): Promise<OperationResult> {
    const availabilityRepo = this.activeManager_.getRepository(Availability);

    const updateResult = await availabilityRepo.update(
      { id: availabilityId },
      { status },
    );

    return {
      success: !!updateResult.affected,
    };
  }

  private async handleTheRollbackOfPlacedQuantities(
    em: EntityManager,
    orderID: string,
  ) {
    const orderRepo = em.getRepository(Order);
    const availabilityProdRepo = em.getRepository(AvailabilityProduct);

    try {
      const order = await orderRepo.findOneOrFail({
        where: { id: orderID },
        relations: ["items.variant.product", "availability"],
      });

      const decrementingPromises = order.items.map((item) => {
        return availabilityProdRepo.decrement(
          {
            product: {
              id: item.variant.product.id,
            },
            availability: {
              id: order.availability.id,
            },
          },
          "orderedQuantity",
          item.quantity,
        );
      });

      await Promise.allSettled(decrementingPromises);
    } catch (error) {
      this.logger.error("placed quantity rollback process failed", error);
    }
  }

  async rollbackPlacedQuantities(orderID: string) {
    this.atomicPhase_(async (em) => {
      return this.handleTheRollbackOfPlacedQuantities(em, orderID);
    });
  }
}

export default AvailabilityService;
