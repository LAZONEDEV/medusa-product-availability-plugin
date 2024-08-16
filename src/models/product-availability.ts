import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  ManyToOne,
  Unique,
} from "typeorm";
import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { Availability } from "./availability";
import { Product } from "./product";

@Entity()
// use composite key to avoid multiple having multiple availability for
// the same Product on the same Availability

/**
 * Checks
 *
 * - `quantity` must be greater than or equal to zero
 * - `orderedQuantity` must be greater than or equal to zero
 * - `orderedQuantity`  must be less than or equal to `quantity`
 */
@Check(`"quantity" >= 0`)
@Check(`"orderedQuantity" >= 0`)
@Check(`"orderedQuantity" =< "quantity"`)
@Unique("availability_product_unique_constraint", ["product", "availability"])
export class AvailabilityProduct extends BaseEntity {
  @Column("smallint", { nullable: true })
  quantity: number | null;

  @Column("smallint", { default: 0 })
  orderedQuantity: number;

  @ManyToOne(() => Product, (product) => product.availabilities)
  product: Product;

  @ManyToOne(
    () => Availability,
    (availability) => availability.availabilityProducts,
  )
  availability: Availability;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "prod_availability");
  }
}
