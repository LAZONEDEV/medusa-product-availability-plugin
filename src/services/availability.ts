import { TransactionBaseService } from "@medusajs/medusa";
import { Availability } from "@/models/availability";
import { CreateAvailabilityDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import AvailabilityProductService from "./availability-product";
import InternalServerError from "@/error/InternalServerError";
import { GetAvailabilitiesDto } from "@/api/admin/availabilities/dtos/get-availabilities.dtos";
import { FindOneOptions, MoreThan } from "typeorm";
import { GetAvailabilitiesResponseDto } from "@/types/availability";

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

    const skipOffset = query.page
      ? Math.max(query.page * (query.limit || defaultQuery.limit), 0)
      : defaultQuery.page;

    const availabilities = await availabilityRepo.find({
      where: whereClose,
      skip: skipOffset,
      take: query.limit || defaultQuery.limit,
      order: { created_at: "DESC" },
    });

    return { availabilities };
  }

  async create(data: CreateAvailabilityDto) {
    return this.atomicPhase_(async (entityManager) => {
      try {
        const availabilityRepo = entityManager.getRepository(Availability);
        const availability = availabilityRepo.create(data);

        await availabilityRepo.save(availability);

        await this.availabilityProductService.create(
          data.availabilityProducts,
          availability.id,
        );

        return availability;
      } catch (error) {
        throw new InternalServerError();
      }
    });
  }
}

export default AvailabilityService;
