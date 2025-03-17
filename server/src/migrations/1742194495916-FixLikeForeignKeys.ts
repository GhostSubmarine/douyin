import { MigrationInterface, QueryRunner } from "typeorm";

export class FixLikeForeignKeys1742194495916 implements MigrationInterface {
    name = 'FixLikeForeignKeys1742194495916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "like" ("id" SERIAL NOT NULL, "user_id" integer, "videoId" character varying, CONSTRAINT "UQ_de9eedf92cfcea50ce189e2209b" UNIQUE ("user_id", "videoId"), CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "video" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_4356ac2f9519c7404a2869f1691" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_80c9b117ff5a70ddc277b8bdd41" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_80c9b117ff5a70ddc277b8bdd41"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_4356ac2f9519c7404a2869f1691"`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "likeCount"`);
        await queryRunner.query(`DROP TABLE "like"`);
    }

}
