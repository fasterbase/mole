import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672491739376 implements MigrationInterface {
    name = 'migrations1672491739376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DeviceData" ("id" SERIAL NOT NULL, "deviceName" character varying NOT NULL, "deviceId" character varying NOT NULL, "key" character varying NOT NULL, "segmentId" integer NOT NULL, "data" integer NOT NULL, "receivedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0e614fda13d8a273681c05a0724" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "DeviceData"`);
    }

}
