CREATE TABLE "presentation" (
	"id" text PRIMARY KEY NOT NULL,
	"regional_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rating" (
	"id" text PRIMARY KEY NOT NULL,
	"presentation_id" text NOT NULL,
	"jury_id" text NOT NULL,
	"score" integer,
	"comment" text
);
--> statement-breakpoint
CREATE TABLE "regional" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "presentation" ADD CONSTRAINT "presentation_regional_id_regional_id_fk" FOREIGN KEY ("regional_id") REFERENCES "public"."regional"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_presentation_id_presentation_id_fk" FOREIGN KEY ("presentation_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;