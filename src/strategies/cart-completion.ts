import { ValidationErrorMessage } from "@/constants/validation-error-message";
import { AvailabilityStatus } from "@/enums";
import CartValidationError from "@/error/CartValidationFailure";
import { Availability } from "@/models/availability";
import { Order } from "@/models/order";
import AvailabilityProductRepository from "@/repositories/product-availability";
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
      const availabilityProdRepo = this.activeManager_.withRepository(
        AvailabilityProductRepository,
      );
      const orderRepo = this.activeManager_.getRepository(Order);

      const cart = await this.cartService_.retrieve(cartId, {
        relations: [
          "items.variant.product",
          "availability.availabilityProducts.product",
        ],
      });

      if (!cart.availability) {
        throw new CartValidationError(
          ValidationErrorMessage.availabilityNotSetOnCart,
        );
      }

      const availability: Availability = cart.availability;

      if (availability.status === AvailabilityStatus.Inactive) {
        throw new CartValidationError(
          ValidationErrorMessage.cartAvailabilityIsInactive,
        );
      }

      // checking expiration
      if (new Date(availability.date) < new Date()) {
        throw new CartValidationError(
          ValidationErrorMessage.cartAvailabilityExpired,
        );
      }

      // check availability for each product in the cart
      for (const item of cart.items) {
        const product = item.variant.product;

        const productAvailability = availability.availabilityProducts.find(
          (p) => p.product.id === product.id,
        );

        if (!productAvailability) {
          throw new CartValidationError(
            ValidationErrorMessage.productNotAvailableOnTheAvailability(
              product.title,
            ),
          );
        }

        if (productAvailability.quantity === null) {
          // null as quantity means infinite, then just continue
          continue;
        }

        const placedOrder = await availabilityProdRepo.getPlacedOrderQuantity(
          productAvailability.id,
          orderRepo,
        );

        const availableQuantity = productAvailability.quantity - placedOrder;

        if (availableQuantity === 0) {
          throw new CartValidationError(
            ValidationErrorMessage.productNoLongerAvailableOnAvailability(
              product.title,
            ),
          );
        }

        if (availableQuantity < item.quantity) {
          throw new CartValidationError(
            ValidationErrorMessage.availableQuantityExceededError(
              product.title,
              availableQuantity,
            ),
          );
        }
      }

      // call default cart completion strategy
      const { response_body, response_code } = await super.complete(
        cartId,
        ikey,
        context,
      );

      const orderIsCreated = (response_body.data as Order)?.object === "order";

      if (orderIsCreated) {
        const order = response_body.data as Order;
        // set availability to order
        await orderRepo.update(
          { id: order.id },
          {
            availability: {
              id: availability.id,
            },
          },
        );
      }

      return { response_body, response_code };
    } catch (error) {
      if (error instanceof CartValidationError) {
        return {
          response_body: { message: error.message },
          response_code: 422,
        };
      }

      throw error;
    }
  }
}

export default CartCompletionStrategy;
