CREATE TABLE IF NOT EXISTS "users" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar NOT NULL,
	"username" varchar NOT NULL,
	"phone" varchar(60) NOT NULL,
	"email" varchar(254) NOT NULL,
	"password" varchar(60) NOT NULL,
	"created_at" timestamp with time zone DEFAULT (now() at time zone 'utc') NOT NULL,
	"updated_at" timestamp with time zone DEFAULT (now() at time zone 'utc') NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "id_idx" ON "users" ("uuid");