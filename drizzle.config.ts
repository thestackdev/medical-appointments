import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config({ path: `.env`, override: true });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

export default {
  schema: "./database/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: DATABASE_URL,
  },
} satisfies Config;