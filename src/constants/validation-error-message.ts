export const ValidationErrorMessage = {
  availabilityAlreadyExist: "Availability already exists for this date",
  canNotCreateAvailabilityForPast:
    "You can not create availability for past date",
  noDuplicateProdAvailability:
    "You can not create several availabilities for the same product on same availability",
  productNotExists: "product with id $value does not exist",
  availabilityNotFound: "availability not found",
  productAvailabilityNotFound: "product availability not found",
  availabilityAlreadyExpired: "Availability already expired",
  newAvailableQuantityNotBeLessThanPlacedQuantity:
    "The available quantity you want to define must not be less than the order quantity already made.",
  cantDeleteProductAvailabilityThatHaveOrder:
    "You cannot delete a product availability already used to place orders",
  availabilityNotSetOnCart: "No availability has been defined on the cart.",
  productNotAvailableOnTheAvailability: (productTitle: string) =>
    `The product ${productTitle} is not available on the availability set on the cart`,
  availableQuantityExceededError: (
    productTitle: string,
    availableQuantity: number,
  ) =>
    `The available quantity for the product ${productTitle} is ${availableQuantity}`,
  productNoLongerAvailableOnAvailability: (productTitle: string) =>
    `The product ${productTitle} is no longer available on the availability set on the cart`,
  cartAvailabilityIsInactive: "The availability set on the cart is inactive",
  cartAvailabilityExpired: "The availability set on the cart has expired",
};
