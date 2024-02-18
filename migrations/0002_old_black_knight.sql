DO $$ BEGIN
 CREATE TYPE "speciality" AS ENUM('dentist', 'cardiologist', 'neurologist', 'dermatologist', 'gynecologist', 'ophthalmologist', 'orthopedist', 'pediatrician', 'psychiatrist', 'urologist');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doctors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"speciality" "speciality" DEFAULT 'dentist' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
