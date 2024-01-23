import { BeforeInsert, Column, Entity, ManyToOne, Unique } from "typeorm";
import { BaseEntity, Product, generateEntityId } from "@medusajs/medusa";
import { Availability } from "./availability";

@Entity()
// use composite key to avoid multiple having multiple availability for
// the same Product on the same Availability
@Unique("availability_product_unique_constraint", ["product", "availability"])
export class AvailabilityProduct extends BaseEntity {
  @Column("smallint", { nullable: true })
  quantity: number;

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
