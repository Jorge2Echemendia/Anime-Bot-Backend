CREATE TABLE "users" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"warnings" integer DEFAULT 0 NOT NULL,
	"is_banned" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
