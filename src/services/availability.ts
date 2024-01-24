import { TransactionBaseService } from "@medusajs/medusa";
import { Availability } from "@/models/availability";
import { CreateAvailabilityDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import AvailabilityProductService from "./availability-product";
import { GetAvailabilitiesDto } from "@/api/admin/availabilities/dtos/get-availabilities.dtos";
import { FindOneOptions, MoreThan, QueryFailedError } from "typeorm";
import { GetAvailabilitiesResponseDto } from "@/types/availability";
import BadRequestError from "@/error/BadRequestError";
import { checkAvailabilityDuplicationError } from "@/utils/check-error";
import { ValidationErrorMessage } from "@/constants/validation-error-message";

class AvailabilityService extends TransactionBaseService {
  protected availabilityProductService: AvailabilityProductService;

  constructor(config) {
    super(config);
    this.availabilityProductService = config.availabilityProductService;
  }

  async get(
    query: GetAvailabilitiesDto,
  ): Promise<GetAvailabilitiesResponseDto> {
    const availabilityRepo = this.activeManager_.getRepository(Availability);

    const whereClose: FindOneOptions<Availability>["where"] = {};
    const defaultQuery: GetAvailabilitiesDto = {
      includeExpired: false,
      limit: 10,
      page: 0,
    };

    // expired availabilities are those whose dates have passed.
    if (!query.includeExpired) {
      whereClose.date = MoreThan(new Date());
    }

    const queryLimit = query.limit || defaultQuery.limit;

    const skipOffset = query.page
      ? Math.max(query.page * queryLimit, 0)
      : defaultQuery.page;

    const [availabilities, totalCount] = await availabilityRepo.findAndCount({
      where: whereClose,
      skip: skipOffset,
      take: queryLimit,
      order: { created_at: "DESC" },
      relations: {
        availabilityProducts: {
          product: true,
        },
      },
    });

    return { availabilities, totalCount };
  }

  async create(data: CreateAvailabilityDto) {
    return this.atomicPhase_(async (entityManager) => {
      try {
        const availabilityRepo = entityManager.getRepository(Availability);
        const availability = availabilityRepo.create(data);

        const savedAvailability = await availabilityRepo.save(availability);
        console.log(savedAvailability);

        await this.availabilityProductService.create(
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
}

export default AvailabilityService;
