ALTER TABLE "presentation" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "presentation" CASCADE;--> statement-breakpoint
ALTER TABLE "rating" DROP CONSTRAINT "rating_presentation_id_presentation_id_fk";
--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "regional_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "judge_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "regionalMusic" json;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "originalMusic" json;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_regional_id_regional_id_fk" FOREIGN KEY ("regional_id") REFERENCES "public"."regional"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_judge_id_user_id_fk" FOREIGN KEY ("judge_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN "presentation_id";--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN "jury_id";--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN "score";--> statement-breakpoint
ALTER TABLE "rating" DROP COLUMN "comment";--> statement-breakpoint
ALTER TABLE "regional" DROP COLUMN "color";