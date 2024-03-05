import { createRequestHandler } from "@/utils/request-handler";
import { MedusaRequest } from "@medusajs/medusa";
import CartService from "@/services/cart";

export const verifyIfCartMatchesAvailability = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const cartId = req.params.cartId;
      const cartService = req.scope.resolve<CartService>("cartService");

      const { success } = await cartService.verifyIfMatchesAvailability(cartId);
      return { success };
    } catch (err) {
      throw err;
    }
  },
);
