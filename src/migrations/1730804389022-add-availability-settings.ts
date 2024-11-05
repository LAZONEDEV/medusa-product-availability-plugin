import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvailabilitySettings1730804389022
  implements MigrationInterface
{
  name = "AddAvailabilitySettings1730804389022";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."availability_settings_configname_enum" AS ENUM('defaultWithdrawAndDeliveryInfo')`,
    );
    await queryRunner.query(
      `CREATE TABLE "availability_settings" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "configName" "public"."availability_settings_configname_enum" NOT NULL, "value" json NOT NULL DEFAULT '{}', CONSTRAINT "UQ_1b02a9537a7019d2bf5a82433f1" UNIQUE ("configName"), CONSTRAINT "PK_4b1219c9178fed10012316b04cb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "availability_settings"`);
    await queryRunner.query(
      `DROP TYPE "public"."availability_settings_configname_enum"`,
    );
  }
}
