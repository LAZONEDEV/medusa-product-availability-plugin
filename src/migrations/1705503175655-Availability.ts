import { MigrationInterface, QueryRunner } from "typeorm";

export class Availability1705503175655 implements MigrationInterface {
  name = "Availability1705503175655";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."availability_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "availability" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."availability_status_enum" NOT NULL DEFAULT 'active', "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_05a8158cf1112294b1c86e7f1d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "availability_product" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "quantity" smallint, "productId" character varying, "availabilityId" character varying, CONSTRAINT "PK_8917f2b90ae8ef1156b90c4be72" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "availability_product" ADD CONSTRAINT "FK_976c28587ff9a0b4b9f65f5e5f0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "availability_product" ADD CONSTRAINT "FK_f357cd3fd9d5a5d3cd275a2e1c2" FOREIGN KEY ("availabilityId") REFERENCES "availability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "availability_product" DROP CONSTRAINT "FK_f357cd3fd9d5a5d3cd275a2e1c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "availability_product" DROP CONSTRAINT "FK_976c28587ff9a0b4b9f65f5e5f0"`,
    );
    await queryRunner.query(`DROP TABLE "availability_product"`);
    await queryRunner.query(`DROP TABLE "availability"`);
    await queryRunner.query(`DROP TYPE "public"."availability_status_enum"`);
  }
}