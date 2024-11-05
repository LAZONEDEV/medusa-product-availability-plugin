import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity, generateEntityId } from "@medusajs/medusa";
import { AvailabilityConfigNames } from "../enums/availability-settings-name";

@Entity()
export class AvailabilitySettings extends BaseEntity {
  @Column("enum", { enum: AvailabilityConfigNames, unique: true })
  configName: AvailabilityConfigNames;

  @Column("json", { default: {} })
  value: Record<string, string>;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "availability_setting");
  }
}
