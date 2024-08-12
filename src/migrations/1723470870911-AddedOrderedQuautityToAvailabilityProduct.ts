import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedOrderedQuautityToAvailabilityProduct1723470870911
  implements MigrationInterface
{
  name = "AddedOrderedQuautityToAvailabilityProduct1723470870911";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "availability_product"
            ADD "orderedQuantity" smallint NOT NULL DEFAULT '0'
        `);

    await queryRunner.query(`
            ALTER TABLE "availability_product"
            ADD CONSTRAINT "CHK_c3c9c9acceb8b76c0bead8a7cf" CHECK ("orderedQuantity" >= 0)
        `);
    await queryRunner.query(`
            ALTER TABLE "availability_product"
            ADD CONSTRAINT "CHK_f59646f7de5d36a8e56609e6e8" CHECK ("quantity" >= 0)
        `);

    await queryRunner.query(`
            ALTER TABLE "availability_product"
            ADD CONSTRAINT "CHK_8a696d4ca4385c910ba70568b4" CHECK ("orderedQuantity" <= "quantity")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "availability_product" DROP CONSTRAINT "CHK_f59646f7de5d36a8e56609e6e8"
        `);
    await queryRunner.query(`
            ALTER TABLE "availability_product" DROP CONSTRAINT "CHK_c3c9c9acceb8b76c0bead8a7cf"
        `);
    await queryRunner.query(`
            ALTER TABLE "availability_product" DROP CONSTRAINT "CHK_8a696d4ca4385c910ba70568b4"
        `);

    await queryRunner.query(`
            ALTER TABLE "availability_product" DROP COLUMN "orderedQuantity"
        `);
  }
}
