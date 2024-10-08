import CartValidationError from "@/error/CartValidationFailure";
import { Order } from "@/models/order";
import { AvailabilityProduct } from "@/models/product-availability";
import CartService from "@/services/cart";
import { CartCompletionResponse, IdempotencyKey } from "@medusajs/medusa";
import CoreCartCompletionStrategy from "@medusajs/medusa/dist/strategies/cart-completion";
import { RequestContext } from "@medusajs/medusa/dist/types/request";
import { EntityManager } from "typeorm";

class CartCompletionStrategy extends CoreCartCompletionStrategy {
  constructor() {
    super(arguments[0]);
  }

  private async handleComplete(
    cartId: string,
    ikey: IdempotencyKey,
    context: RequestContext,
    manager: EntityManager,
  ): Promise<CartCompletionResponse> {
    try {
      const { cart } = await (this.cartService_ as CartService)
        .withTransaction(manager)
        .verifyIfMatchesAvailability(cartId);

      const availabilityProductRepo =
        manager.getRepository(AvailabilityProduct);

      // add reservations
      await Promise.allSettled(
        cart.items.map((item) => {
          return availabilityProductRepo.increment(
            {
              product: item.variant.product.id,
              availability: cart.availability.id,
            },
            "orderedQuantity",
            item.quantity,
          );
        }),
      );

      // call default cart completion strategy
      const { response_body, response_code } = await super.complete(
        cartId,
        ikey,
        context,
      );

      const orderSuccessfullyCreated =
        (response_body.data as Order)?.object === "order";

      if (orderSuccessfullyCreated) {
        const orderRepo = manager.getRepository(Order);

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
      } else {
        // delete reservations
        await Promise.allSettled(
          cart.items.map((item) => {
            return availabilityProductRepo.decrement(
              {
                product: { id: item.variant.product.id },
              },
              "orderedQuantity",
              item.quantity,
            );
          }),
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

  async complete(
    cartId: string,
    ikey: IdempotencyKey,
    context: RequestContext,
  ): Promise<CartCompletionResponse> {
    return this.atomicPhase_(async (manager) =>
      this.handleComplete(cartId, ikey, context, manager),
    );
  }
}

export default CartCompletionStrategy;
