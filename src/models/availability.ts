import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { AvailabilityStatus } from "../enums";
import { AvailabilityProduct } from "./product-availability";
import { Cart } from "./cart";
import { Order } from "./order";
import computeAvailabilityDateLimitTime from "@/utils/compute-availability-date";
import checkAvailabilityNotExistsForADate from "@/utils/validator/check-availability-not-exists-for-date";
import { ValidationErrorMessage } from "@/constants/validation-error-message";
import BadRequestError from "@/error/BadRequestError";

@Entity()
export class Availability extends BaseEntity {
  @Column({
    type: "enum",
    enum: AvailabilityStatus,
    default: AvailabilityStatus.Active,
  })
  status: AvailabilityStatus;

  @Column({ type: "timestamp with time zone", unique: true })
  date: Date;

  @OneToMany(
    () => AvailabilityProduct,
    (availabilityProduct) => availabilityProduct.availability,
    { cascade: ["remove"] },
  )
  availabilityProducts: AvailabilityProduct[];

  @OneToMany(() => Order, (order) => order.availability)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.availability)
  carts: Cart[];

  @BeforeUpdate()
  private async beforeUpdate(): Promise<void> {
    this.checkDayUniqueness();
    this.setDateValue();
  }

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    this.checkDayUniqueness();
    this.setDateValue();

    this.id = generateEntityId(this.id, "availability");
  }

  private setDateValue() {
    // ensure that date is always set to limit time
    const limitTime = computeAvailabilityDateLimitTime(this.date);
    if (this.date !== limitTime) {
      this.date = limitTime;
    }
  }

  private async checkDayUniqueness() {
    const exists = await checkAvailabilityNotExistsForADate(this.date);
    if (exists) {
      throw new BadRequestError(
        ValidationErrorMessage.availabilityAlreadyExist,
      );
    }
  }
}
