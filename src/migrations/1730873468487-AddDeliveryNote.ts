import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeliveryNote1730873468487 implements MigrationInterface {
  name = "AddDeliveryNote1730873468487";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "availability" ADD "withdrawNote" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "availability" ADD "deliveryNote" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "availability" DROP COLUMN "deliveryNote"`,
    );
    await queryRunner.query(
      `ALTER TABLE "availability" DROP COLUMN "withdrawNote"`,
    );
  }
}
