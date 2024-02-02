import { Entity, ManyToOne } from "typeorm";
import { Cart as MedusaCart } from "@medusajs/medusa";
import { Availability } from "./availability";

@Entity()
export class Cart extends MedusaCart {
  @ManyToOne(
    () => Availability,
    (availabilityProduct) => availabilityProduct.carts,
  )
  availability: Availability;
}
