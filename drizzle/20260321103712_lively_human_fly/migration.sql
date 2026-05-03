CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"icon" varchar(40) NOT NULL,
	"nickname" varchar(32) NOT NULL,
	"username" varchar(32) NOT NULL UNIQUE,
	"email" varchar(320) NOT NULL UNIQUE,
	"pw_hash" varchar(60) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
