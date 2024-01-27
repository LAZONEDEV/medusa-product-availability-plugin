import { Entity, ManyToOne } from "typeorm";
import { Order as MedusaOrder } from "@medusajs/medusa";
import { Availability } from "./availability";

@Entity()
export class Order extends MedusaOrder {
  @ManyToOne(
    () => Availability,
    (availabilityProduct) => availabilityProduct.orders,
  )
  availability: Availability;
}
