
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPost1618055088391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS device (
        id integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
        device varchar NOT NULL, 
        os varchar NOT NULL, 
        manufacturer varchar NOT NULL, 
        lastCheckedOutDate varchar NOT NULL, 
        lastCheckedOutBy varchar NOT NULL, 
        isCheckedOut boolean NOT NULL
      );
    `)
    await queryRunner.query(`
      INSERT INTO device (device, os, manufacturer, lastCheckedOutDate, lastCheckedOutBy, isCheckedOut)
      VALUES ('MotoG', 'Android4.3', 'Motorola', '2016-02-21T09:10:00-05:00', 'ChrisEvans', false);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM device`)
  }
}