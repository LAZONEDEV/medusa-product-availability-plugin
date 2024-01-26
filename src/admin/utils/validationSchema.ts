import { object, string, number, date, array } from "yup";
import { validationMessage } from "../messages/all";

const productAvailabilitySchema = object({
  productId: string().required(validationMessage.requiredField),
  quantity: number().min(1, validationMessage.invalidQuantity).nullable(),
});

export const createAvailabilitySchema = object({
  date: date().required(validationMessage.requiredField),
  availabilityProducts: array()
    .of(productAvailabilitySchema)
    .min(1, validationMessage.noEmptyAvailabilityProds),
});
