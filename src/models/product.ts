import { Entity, OneToMany } from "typeorm";
import { Product as MedusaProduct } from "@medusajs/medusa";
import { AvailabilityProduct } from "./product-availability";

@Entity()
export class Product extends MedusaProduct {
  @OneToMany(
    () => AvailabilityProduct,
    (availabilityProduct) => availabilityProduct.product,
  )
  availabilities: AvailabilityProduct[];
}
