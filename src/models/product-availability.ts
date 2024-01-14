import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { BaseEntity, Product, generateEntityId } from "@medusajs/medusa";
import { Availability } from "./availability";

@Entity()
export class AvailabilityProduct extends BaseEntity {
  @Column("smallint", { nullable: true })
  quantity: number;

  @OneToOne(() => Product)
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
