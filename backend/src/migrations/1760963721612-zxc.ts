import { MigrationInterface, QueryRunner } from "typeorm";

export class Zxc1760963721612 implements MigrationInterface {
    name = 'Zxc1760963721612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "del" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cyrillic" character varying NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "UQ_47e2ba5a80734f616866108e923" UNIQUE ("cyrillic"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying, "password_hash" character varying NOT NULL, "del" integer NOT NULL DEFAULT '0', "image_url" character varying(2048), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "badges" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "del" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_9c91fc9c4a4ae01712baad1e9f6" UNIQUE ("name"), CONSTRAINT "PK_8a651318b8de577e8e217676466" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "subtitle" character varying, "meta_description" character varying(512), "meta_og_description" character varying(512), "meta_og_title" character varying(255), "cover_image_url" character varying, "content" text NOT NULL, "views" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "author_id" integer NOT NULL, CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "post_id" integer NOT NULL, "author_id" integer NOT NULL, "parent_comment_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parser-data" ("id" SERIAL NOT NULL, "display_name" character varying NOT NULL, "all_time_peak_viewers" integer NOT NULL DEFAULT '0', "hours_watched" integer NOT NULL DEFAULT '0', "logo" character varying NOT NULL DEFAULT '0', "followers_gained" character varying NOT NULL DEFAULT '0', "time_streamed" real NOT NULL DEFAULT '0', "total_followers" integer NOT NULL DEFAULT '0', "avg_viewers" integer NOT NULL DEFAULT '0', "total_views" integer NOT NULL DEFAULT '0', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_4835c8a3e0a7abf18e31fc59a59" UNIQUE ("display_name"), CONSTRAINT "PK_4b83ec25afe3a13487687800f21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_roles_roles" ("users_id" integer NOT NULL, "roles_id" integer NOT NULL, CONSTRAINT "PK_27d0ca9155872fb087086b6a9f5" PRIMARY KEY ("users_id", "roles_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_178c6a2b971c18df6467eaf687" ON "users_roles_roles" ("users_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_291889ab59fe7785020c96066e" ON "users_roles_roles" ("roles_id") `);
        await queryRunner.query(`CREATE TABLE "posts_tags_tags" ("posts_id" integer NOT NULL, "tags_id" integer NOT NULL, CONSTRAINT "PK_1b6832cadac9530f3043e4d9dad" PRIMARY KEY ("posts_id", "tags_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ce78a8c7bee6cd7af7c7a201d" ON "posts_tags_tags" ("posts_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6cb07477b825e440544db8083f" ON "posts_tags_tags" ("tags_id") `);
        await queryRunner.query(`CREATE TABLE "posts_badges_badges" ("posts_id" integer NOT NULL, "badges_id" integer NOT NULL, CONSTRAINT "PK_73d2a40e8b1c6437708af4f772a" PRIMARY KEY ("posts_id", "badges_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9061fd8cc4e08c4152a3cead2a" ON "posts_badges_badges" ("posts_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4af1f21c656da8888df6957425" ON "posts_badges_badges" ("badges_id") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_93ce08bdbea73c0c7ee673ec35a" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_178c6a2b971c18df6467eaf687a" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_291889ab59fe7785020c96066e9" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" ADD CONSTRAINT "FK_8ce78a8c7bee6cd7af7c7a201d5" FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" ADD CONSTRAINT "FK_6cb07477b825e440544db8083f2" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_badges_badges" ADD CONSTRAINT "FK_9061fd8cc4e08c4152a3cead2ab" FOREIGN KEY ("posts_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_badges_badges" ADD CONSTRAINT "FK_4af1f21c656da8888df6957425b" FOREIGN KEY ("badges_id") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_badges_badges" DROP CONSTRAINT "FK_4af1f21c656da8888df6957425b"`);
        await queryRunner.query(`ALTER TABLE "posts_badges_badges" DROP CONSTRAINT "FK_9061fd8cc4e08c4152a3cead2ab"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" DROP CONSTRAINT "FK_6cb07477b825e440544db8083f2"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" DROP CONSTRAINT "FK_8ce78a8c7bee6cd7af7c7a201d5"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_291889ab59fe7785020c96066e9"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_178c6a2b971c18df6467eaf687a"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_93ce08bdbea73c0c7ee673ec35a"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4af1f21c656da8888df6957425"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9061fd8cc4e08c4152a3cead2a"`);
        await queryRunner.query(`DROP TABLE "posts_badges_badges"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6cb07477b825e440544db8083f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ce78a8c7bee6cd7af7c7a201d"`);
        await queryRunner.query(`DROP TABLE "posts_tags_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_291889ab59fe7785020c96066e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_178c6a2b971c18df6467eaf687"`);
        await queryRunner.query(`DROP TABLE "users_roles_roles"`);
        await queryRunner.query(`DROP TABLE "parser-data"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "badges"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
