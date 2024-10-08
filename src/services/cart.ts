import {
  CartValidationErrorCode,
  cartCompletionErrorsInfo,
} from "@/constants/cart-validation-error-messages";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import { AvailabilityStatus } from "@/enums";
import CartValidationError from "@/error/CartValidationFailure";
import { Availability } from "@/models/availability";
import { OperationResult } from "@/types/api";
import { getStoreTimeZoneCurrentDateStartOfDay } from "@/utils/date/getStartOfDay";
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
        success: Number(updateResult.affected) > 0,
      };
    } catch (error) {
      throw error;
    }
  }

  private async handleAvailabilityMatchesVerification(cartId: string) {
    try {
      const cart = await this.retrieve(cartId, {
        relations: [
          "items.variant.product",
          "availability.availabilityProducts.product",
        ],
      });

      if (!cart.availability) {
        throw new CartValidationError(
          cartCompletionErrorsInfo.AVAILABILITY_NOT_SET_ON_CART!,
        );
      }

      const availability: Availability = cart.availability;

      if (availability.status === AvailabilityStatus.Inactive) {
        throw new CartValidationError(
          cartCompletionErrorsInfo.AVAILABILITY_INACTIVE!,
        );
      }

      // checking expiration
      if (
        new Date(availability.date) < getStoreTimeZoneCurrentDateStartOfDay()
      ) {
        throw new CartValidationError(
          cartCompletionErrorsInfo.AVAILABILITY_EXPIRED!,
        );
      }

      // check availability for each product in the cart
      for (const item of cart.items) {
        const product = item.variant.product;

        const productAvailability = availability.availabilityProducts.find(
          (p) => p.product.id === product.id,
        );

        if (!productAvailability) {
          const errorMessage =
            ValidationErrorMessage.productNotAvailableOnTheAvailability(
              product.title,
            );

          throw new CartValidationError(
            {
              code: CartValidationErrorCode.PRODUCT_NOT_AVAILABLE_ON_AVAILABILITY,
              message: errorMessage,
            },
            { productTitle: product.title },
          );
        }

        if (productAvailability.quantity === null) {
          // null as quantity means infinite, then just continue
          continue;
        }

        const placedOrdersCount = productAvailability.orderedQuantity;

        const availableQuantity =
          productAvailability.quantity - placedOrdersCount;

        if (availableQuantity === 0) {
          const errorMessage =
            ValidationErrorMessage.productNoLongerAvailableOnAvailability(
              product.title,
            );
          throw new CartValidationError(
            {
              code: CartValidationErrorCode.PRODUCT_NO_LONGER_AVAILABLE_ON_AVAILABILITY,
              message: errorMessage,
            },
            { productTitle: product.title },
          );
        }

        if (availableQuantity < item.quantity) {
          const errorMessage =
            ValidationErrorMessage.availableQuantityExceededError(
              product.title,
              availableQuantity,
            );

          throw new CartValidationError(
            {
              code: CartValidationErrorCode.AVAILABLE_QUANTITY_EXCEEDED,
              message: errorMessage,
            },
            {
              availableQuantity,
              productTitle: product.title,
            },
          );
        }
      }

      return {
        success: true,
        cart,
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyIfMatchesAvailability(cartId: string) {
    return this.handleAvailabilityMatchesVerification(cartId);
  }
}

export default CartService;
