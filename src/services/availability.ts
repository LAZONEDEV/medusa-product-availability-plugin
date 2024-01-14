import { TransactionBaseService } from "@medusajs/medusa";
import { Availability } from "@/models/availability";
import { CreateAvailabilityDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import AvailabilityProductService from "./availability-product";
import InternalServerError from "@/error/InternalServerError";

class AvailabilityService extends TransactionBaseService {
  protected availabilityProductService: AvailabilityProductService;

  constructor(config) {
    super(config);
    this.availabilityProductService = config.availabilityProductService;
  }

  async get(): Promise<Availability[]> {
    const availabilityRepo = this.activeManager_.getRepository(Availability);

    return await availabilityRepo.find();
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
