import { object, string, number, date, array } from "yup";
import { validationMessage } from "../messages/all";

const quantityValidator = number()
  .min(1, validationMessage.invalidQuantity)
  .nullable();

const productAvailabilitySchema = object({
  productId: string().required(validationMessage.requiredField),
  quantity: quantityValidator,
});

const availabilityProductsValidator = array()
  .of(productAvailabilitySchema)
  .min(1, validationMessage.noEmptyAvailabilityProds);

export const createAvailabilitySchema = object({
  date: date().required(validationMessage.requiredField),
  availabilityProducts: availabilityProductsValidator,
});

export const createAvailabilitiesSchema = object({
  availabilityProducts: availabilityProductsValidator,
});

export const updateProductAvailabilitySchema = object({
  quantity: quantityValidator,
});
