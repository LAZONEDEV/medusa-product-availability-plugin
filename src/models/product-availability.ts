import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, Product, generateEntityId } from "@medusajs/medusa";
import { Availability } from "./availability";

@Entity()
export class AvailabilityProduct extends BaseEntity {
  @Column("smallint", { nullable: true })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.availabilities)
  @JoinColumn()
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
