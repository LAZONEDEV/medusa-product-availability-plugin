import { TransactionBaseService } from "@medusajs/medusa";
import type { CreateAvailabilityProductDto } from "@/admin-api/availabilities/dtos/create-availability.dtos";
import { AvailabilityProduct } from "@/models/product-availability";
import InternalServerError from "@/error/InternalServerError";

class AvailabilityProductService extends TransactionBaseService {
  async create(items: CreateAvailabilityProductDto[], availabilityId: string) {
    const itemsWithAvailabilityId = items.map(({ productId, quantity }) => ({
      quantity,
      product: { id: productId },
      availability: { id: availabilityId },
    }));

    this.atomicPhase_((entityManager) => {
      try {
        const availabilityProdRepo =
          entityManager.getRepository(AvailabilityProduct);

        const availabilities = availabilityProdRepo.create(
          itemsWithAvailabilityId,
        );

        return availabilityProdRepo.save(availabilities);
      } catch (error) {
        throw new InternalServerError();
      }
    });
  }
}

export default AvailabilityProductService;
