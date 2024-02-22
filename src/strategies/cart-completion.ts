import {
  CartValidationErrorCode,
  cartCompletionErrorsInfo,
} from "@/constants/cart-validation-error-messages";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import { AvailabilityStatus } from "@/enums";
import CartValidationError from "@/error/CartValidationFailure";
import { Availability } from "@/models/availability";
import { Order } from "@/models/order";
import AvailabilityProductRepository from "@/repositories/product-availability";
import CartService from "@/services/cart";
import { CartCompletionResponse, IdempotencyKey } from "@medusajs/medusa";
import CoreCartCompletionStrategy from "@medusajs/medusa/dist/strategies/cart-completion";
import { RequestContext } from "@medusajs/medusa/dist/types/request";

class CartCompletionStrategy extends CoreCartCompletionStrategy {
  constructor() {
    super(arguments[0]);
  }

  async complete(
    cartId: string,
    ikey: IdempotencyKey,
    context: RequestContext,
  ): Promise<CartCompletionResponse> {
    try {
      const { cart } = await (
        this.cartService_ as CartService
      ).verifyIfMatchesAvailability(cartId);

      // call default cart completion strategy
      const { response_body, response_code } = await super.complete(
        cartId,
        ikey,
        context,
      );

      const orderIsCreated = (response_body.data as Order)?.object === "order";
      const orderRepo = this.activeManager_.getRepository(Order);

      if (orderIsCreated) {
        const order = response_body.data as Order;
        // set availability to order
        await orderRepo.update(
          { id: order.id },
          {
            availability: {
              id: cart.availability.id,
            },
          },
        );
      }

      return { response_body, response_code };
    } catch (error) {
      if (error instanceof CartValidationError) {
        return {
          response_body: {
            message: error.message,
            code: error.code,
            payload: error.payload,
          },
          response_code: 422,
        };
      }

      throw error;
    }
  }
}

export default CartCompletionStrategy;
