import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAvailabilityDateColumnToDateType1726235114335
  implements MigrationInterface
{
  name = "ChangeAvailabilityDateColumnToDateType1726235114335";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "availability" 
        ALTER COLUMN "date" TYPE date;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "availability" 
        ALTER COLUMN "date" TYPE timestamp with time zone;
        `);
  }
}
