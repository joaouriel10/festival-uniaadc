CREATE TABLE "exclude_rating" (
	"id" text PRIMARY KEY NOT NULL,
	"regional_id" text NOT NULL,
	"judge_id" text NOT NULL,
	"regional_music" json,
	"original_music" json,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "exclude_rating" ADD CONSTRAINT "exclude_rating_regional_id_regional_id_fk" FOREIGN KEY ("regional_id") REFERENCES "public"."regional"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exclude_rating" ADD CONSTRAINT "exclude_rating_judge_id_user_id_fk" FOREIGN KEY ("judge_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;