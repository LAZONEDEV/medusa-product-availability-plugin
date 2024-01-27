export const ValidationErrorMessage = {
  availabilityAlreadyExist: "Availability already exists for this date",
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
};
