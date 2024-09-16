import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";
import { MedusaRequest } from "@medusajs/medusa";
import CartService from "@/services/cart";
import { SetAvailabilityToCartDto } from "../dtos/set-availability-to-card.dtos";

export const setAvailabilityToCart = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const payload = await validator(SetAvailabilityToCartDto, req.body);
      const cartId = req.params.cartId;
      const cartService = req.scope.resolve<CartService>("cartService");

      return cartService.setAvailability(cartId, payload.availabilityId);
    } catch (err) {
      throw err;
    }
  },
);
