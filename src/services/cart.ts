import { OperationResult } from "@/types/api";
import { CartService as MedusaCartService } from "@medusajs/medusa";

class CartService extends MedusaCartService {
  async setAvailability(
    cartId: string,
    availabilityId: string,
  ): Promise<OperationResult> {
    try {
      const updateResult = await this.cartRepository_.update(cartId, {
        availability: {
          id: availabilityId,
        },
      });

      return {
        success: updateResult.affected > 0,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default CartService;
