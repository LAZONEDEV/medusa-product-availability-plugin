import { createRequestHandler } from "@/utils/request-handler";
import { validator } from "@/utils/validator/validator";
import { MedusaRequest } from "@medusajs/medusa";
import AvailabilityService from "@/services/availability";
import CartService from "@/services/cart";
import { SetAvailabilityToCartDto } from "../dtos/set-availability-to-card.dtos";

export const setAvailabilityToCart = createRequestHandler(
  async (req: MedusaRequest) => {
    try {
      const payload = await validator(SetAvailabilityToCartDto, req.body);
      const cartId = req.params.cartId;
      const cartService = req.scope.resolve<CartService>("cartService");
      const availabilityService = req.scope.resolve<AvailabilityService>(
        "availabilityService",
      );
      const availability = await availabilityService.findOne(
        payload.availabilityId,
      );

      return cartService.setAvailability(cartId, availability.id);
    } catch (err) {
      throw err;
    }
  },
);
