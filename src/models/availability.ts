import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { AvailabilityStatus } from "../enums";
import { AvailabilityProduct } from "./product-availability";

@Entity()
export class Availability extends BaseEntity {
  @Column({
    type: "enum",
    enum: AvailabilityStatus,
    default: AvailabilityStatus.Active,
  })
  status: AvailabilityStatus;

  @Column({ type: "date", unique: true })
  date: Date;

  @OneToMany(
    () => AvailabilityProduct,
    (availabilityProduct) => availabilityProduct.availability,
  )
  availabilityProducts: AvailabilityProduct[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "availability");
  }
}
